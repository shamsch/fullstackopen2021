import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import {
    ApolloClient,
    HttpLink,
    ApolloProvider,
    InMemoryCache,
} from "@apollo/client";

//for token to be set on auth in header 
import { setContext } from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token");
    // const token = null; 
    return {
        headers: {
            ...headers,
            authorization: token ? `bearer ${token}` : null,
        },
    };
});

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink), 
});

console.log(authLink.concat(httpLink))
ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById("root")
);
