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
		$author: String!
		$published: Int!
		$genres: [String]!
		$title: String!
	) {
		addBook(
			author: $author
			published: $published
			genres: $genres
			title: $title
		) {
			title
			published
			author
			id
			genres
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
