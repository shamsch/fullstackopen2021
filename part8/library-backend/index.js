const { ApolloServer, gql, UserInputError } = require("apollo-server");
const { v1: uuid } = require("uuid");

const jwt = require("jsonwebtoken");
const JWT_SECRET = "NEED_HERE_A_SECRET_KEY";

const dotenv = require("dotenv");
const { connection } = require("./db/connection");
const Book = require("./model/bookSchema");
const Author = require("./model/authorSchema");
const User = require("./model/userSchema");

dotenv.config();

const username = process.env.USER;
const password = process.env.PASSWORD;

connection(username, password);

//schema
const typeDefs = gql`
    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String]
    }

    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
    }

    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String]!
        ): Book!
        editAuthor(name: String!, setBornTo: Int!): Author
        createUser(username: String!, favoriteGenre: String!): User
        login(username: String!, password: String!): Token
    }
`;

const resolvers = {
    Query: {
        bookCount: async () => await Book.collection.countDocuments(),
        authorCount: async () => await Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            const allBooks = await Book.find({}).populate(
                "author",
                "name -_id"
            );

            if (args.author == undefined && args.genre == undefined) {
                return allBooks;
            }
            //when only author is defined
            if (!args.genre) {
                return allBooks.filter(
                    (book) => book.author.name == args.author
                );
            }
            //when only genre is defined
            if (!args.author) {
                return allBooks.filter((book) =>
                    book.genres.includes(args.genre)
                );
            }

            return allBooks.filter(
                (book) =>
                    book.author.name == args.author &&
                    book.genres.includes(args.genre)
            );
        },
        allAuthors: async () => await Author.find({}),
        me: async (root, args, context) => {
            return context.currentUser;
        },
    },
    Author: {
        bookCount: async (root) => {
            const allBooks = await Book.find({}).populate(
                "author",
                "name -_id"
            );
            return allBooks.filter((book) => book.author.name === root.name)
                .length;
        },
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser;

            if (!currentUser) {
                throw new AuthenticationError("not authenticated");
            }

            try {
                let authorDb = await Author.findOne({ name: args.author });
                if (!authorDb) {
                    const author = new Author({ name: args.author });
                    authorDb = await author.save();
                }
                const newBook = new Book({ ...args, author: authorDb._id });
                const bookAdded = await newBook.save();
                return bookAdded;
            } catch (e) {
                throw new UserInputError(e.message, {
                    invalidArgs: args,
                });
            }
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser;

            if (!currentUser) {
                throw new AuthenticationError("not authenticated");
            }

            const toEdit = await Author.findOne({ name: args.name });
            if (!toEdit) {
                return null;
            }
            const updatedAuthor = { name: toEdit.name, born: args.setBornTo };
            await Author.findByIdAndUpdate(toEdit._id, updatedAuthor);
            return updatedAuthor;
        },
        createUser: async (root, args) => {
            const user = new User({
                username: args.username,
                favoriteGenre: args.favoriteGenre,
            });

            return user.save().catch((error) => {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                });
            });
        },
        login: async (root, args) => {
            //find user from DB
            const user = await User.findOne({ username: args.username });

            //hardcoded password
            if (!user || args.password !== "password") {
                throw new UserInputError("wrong credentials");
            }

            //tokenize username and id into a JWT signature
            const userForToken = {
                username: user.username,
                id: user._id,
            };
            //give the token which we then add to header/authorization prefixing by "bearer "
            return { value: jwt.sign(userForToken, JWT_SECRET) };
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        //if auth is defined
        const auth = req ? req.headers.authorization : null;
        //extract token
        if (auth && auth.toLowerCase().startsWith("bearer ")) {
            //decode the token to get the username and id
            const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
            //using the id, the the user from the user db
            const currentUser = await User.findById(decodedToken.id);
            //share the users among all resolvers
            return { currentUser };
        }
    },
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
