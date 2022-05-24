import { useQuery } from "@apollo/client"
import { GET_ALL_AUTHORS } from "../queries"

const Authors = (props) => {
  const result = useQuery(GET_ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if(result.loading){
    return <div>Loading...</div>
  }

  console.log(result.data)

  const authors = result.data.allAuthours

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
