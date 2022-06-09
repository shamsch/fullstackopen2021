import { useQuery } from "@apollo/client";
import { GET_ALL_AUTHORS } from "../queries";
import SetBirthYear from "./SetBirthYear";

const Authors = (props) => {
    const result = useQuery(GET_ALL_AUTHORS);

    // console.log(result)
    
    if (!props.show) {
        return null;
    }

    if (result.loading) {
        return <div>Loading...</div>;
    }

   

    const authors = result.data.allAuthors;

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
            <SetBirthYear/>
        </div>
    );
};

export default Authors;
