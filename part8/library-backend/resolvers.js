const JWT_SECRET = "NEED_HERE_A_SECRET_KEY";
const jwt = require("jsonwebtoken");

const Book = require("./model/bookSchema");
const Author = require("./model/authorSchema");
const User = require("./model/userSchema");
const { UserInputError, AuthenticationError } = require("apollo-server");


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
                "name -_id" //populates author with only name and excludes everything prefixed with - here in this case _id 
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

module.exports = resolvers