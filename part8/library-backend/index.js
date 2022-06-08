const { ApolloServer, gql } = require("apollo-server");
const { v1: uuid } = require("uuid");

const dotenv = require("dotenv");
const { connection } = require("./db/connection");
const Book = require("./model/bookSchema");
const Author = require("./model/authorSchema");

dotenv.config()

const username = process.env.USER
const password= process.env.PASSWORD

connection(username, password)


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
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String]!
        ): Book!
        editAuthor(name: String!, setBornTo: Int!): Author
    }
`;

const resolvers = {
    Query: {
        bookCount: async () => await Book.collection.countDocuments(),
        authorCount: async () => await Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            const allBooks = await Book.find({}).populate("author", "name -_id");

            if (args.author == undefined && args.genre == undefined) {
                return allBooks;
            }
            //when only author is defined
            if (!args.genre) {
                return allBooks.filter((book) => book.author.name == args.author);
            }
            //when only genre is defined
            if (!args.author) {
                return allBooks.filter((book) => book.genres.includes(args.genre));
            }

            return allBooks.filter(
                (book) =>
                    book.author.name == args.author &&
                    book.genres.includes(args.genre)
            );
        },
        allAuthors: async () => await Author.find({}),
    },
    Author: {

        bookCount: async (root) => {
            const allBooks = await Book.find({}).populate("author", "name -_id"); 
            return allBooks.filter((book) => book.author.name === root.name).length
        }
            
    },
    Mutation: {
        addBook: async (root, args) => {
            try {
                let authorDb = await Author.findOne({name: args.author})
                if(!authorDb){
                    const author = new Author({name: args.author})
                    authorDb = await author.save()
                }
                const newBook = new Book({...args, author: authorDb._id})
                const bookAdded = await newBook.save()
                return bookAdded;
            }
            catch(e){
                console.log(e)
            }
        },
        editAuthor: async (root, args) => {
            const toEdit = await Author.findOne({name: args.name})
            if (!toEdit) {
                return null;
            }
            const updatedAuthor = {name: toEdit.name, born: args.setBornTo };
            const updatedAuthorDb = await Author.findByIdAndUpdate(toEdit._id, updatedAuthor);
            return updatedAuthor;
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
