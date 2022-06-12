import { useQuery } from "@apollo/client";
import { ALL_BOOK_WITH_GENRE, FAVORITE_GENRE } from "../queries";

const Recommendation = (props) => {
    const getFav = useQuery(FAVORITE_GENRE);
    const favoriteGenre = getFav.data? getFav.data.me.favoriteGenre : null;
    const resultWithFilter = useQuery(ALL_BOOK_WITH_GENRE, {
        variables: { genre: favoriteGenre },
        skip: !favoriteGenre,
    });

    if (!props.show) {
        return null;
    }

    if (resultWithFilter.loading || favoriteGenre.loading) {
        return <div>Loading...</div>;
    }

    const books = resultWithFilter.data.allBooks;

    return (
        <div>
            <h2>recommendations</h2>
            <p>
                books in your favorite genre <b>{favoriteGenre}</b>
            </p>
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
        </div>
    );
};

export default Recommendation;
