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