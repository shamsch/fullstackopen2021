import { useQuery } from "@apollo/client";
import { useState } from "react";
import {
    ALL_BOOK_WITH_GENRE,
    ALL_GENRE,
    GET_BOOKS_WTHOUT_GENRE,
} from "../queries";

const Books = (props) => {
    const [filter, setFilter] = useState(null);

    const result = useQuery(GET_BOOKS_WTHOUT_GENRE);
    const resultWithFilter = useQuery(ALL_BOOK_WITH_GENRE, {
        variables: { genre: filter },
        skip: !filter,
    });



    const genres = useQuery(ALL_GENRE);

    if (!props.show) {
        return null;
    }

    if (result.loading || resultWithFilter.loading) {
        return <div>Loading...</div>;
    }

    //all unique genres
    const getGenres = (genres) => {
        const gqlGenres = genres.data.allBooks;
        const allGenresArray = gqlGenres.map((ele) => ele.genres);
        const allGenres = [...new Set(allGenresArray.flat())];
        return allGenres;
    };

    const allGenres = getGenres(genres);
    const books = resultWithFilter.data? resultWithFilter.data.allBooks : result.data.allBooks;

    return (
        <div>
            <h2>books</h2>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {allGenres.map((ele, idx) => (
                <button
                    key={idx}
                    onClick={(e) => setFilter(e.target.name)}
                    name={ele}
                >
                    {ele}
                </button>
            ))}
        </div>
    );
};

export default Books;
