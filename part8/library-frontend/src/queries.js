import { gql } from "@apollo/client";

export const GET_ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
            id
        }
    }
`;

export const GET_ONLY_ALL_AUTHOR_NAME = gql`
    query {
        allAuthors {
            name
        }
    }
`;

export const GET_BOOKS_WTHOUT_GENRE = gql`
    query GET_BOOKS_WTHOUT_GENRE {
        allBooks {
            title
            published
            id
            author {
                name
            }
        }
    }
`;

export const ADD_BOOK = gql`
    mutation AddBook(
        $title: String!
        $author: String!
        $published: Int!
        $genres: [String]!
    ) {
        addBook(
            title: $title
            author: $author
            published: $published
            genres: $genres
        ) {
            title
        }
    }
`;

export const CHANGE_AUTHOR_BORN = gql`
    mutation EditAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            name
            born
        }
    }
`;

export const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`;

export const ALL_GENRE = gql`
    query AllBooks {
        allBooks {
            genres
        }
    }
`;

export const ALL_BOOK_WITH_GENRE = gql`
    query AllBooks($genre: String) {
        allBooks(genre: $genre) {
            title
            published
            author {
                name
            }
            id
            genres
        }
    }
`;

export const FAVORITE_GENRE = gql`
    query FAVORITE{
        me {
            favoriteGenre
        }
    }
`;
