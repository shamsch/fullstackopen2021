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