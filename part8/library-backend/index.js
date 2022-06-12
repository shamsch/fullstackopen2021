const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require("express");
const http = require("http");

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

const typeDefs = require("./schema");

const resolvers = require("./resolvers");

const start = async () => {
    const app = express();
    const httpServer = http.createServer(app);

    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const server = new ApolloServer({
        schema,
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
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();

    server.applyMiddleware({
        app,
        path: "/",
    });

    const PORT = 4000;

    httpServer.listen(PORT, () =>
        console.log(`Server is now running on http://localhost:${PORT}`)
    );
};

start()