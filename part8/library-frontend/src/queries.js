import { gql  } from '@apollo/client'

export const GET_ALL_AUTHORS =  gql`
    query {
        allAuthours {
            name
            born
            bookCount
            id
      }}
`
export const GET_BOOKS_WTHOUT_GENRE = gql`
    query GET_BOOKS_WTHOUT_GENRE{
        allBooks {
        title
        published
        author
        id
    }
  }
  
`

export const ADD_BOOK= gql`
    mutation AddBook($author: String!, $published: Int!, $genres: [String]!, $title: String!) {
        addBook(author: $author, published: $published, genres: $genres, title: $title) {
            title
            published
            author
            id
            genres
    }
  }
  
  
`