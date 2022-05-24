import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_BOOK, GET_ALL_AUTHORS, GET_BOOKS_WTHOUT_GENRE } from "../queries";

const NewBook = (props) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [published, setPublished] = useState("");
    const [genre, setGenre] = useState("");
    const [genres, setGenres] = useState([]);

    //the second param to useMutation creates a ref against given query
    //refetches instead of retaining from cache when mutation is called
    //thus causing update as new book is added and change reflected real timme
    const [addBook] = useMutation(ADD_BOOK, {
        refetchQueries: [
            { query: GET_ALL_AUTHORS },
            { query: GET_BOOKS_WTHOUT_GENRE },
        ],
    });

    if (!props.show) {
        return null;
    }

    const submit = async (event) => {
        event.preventDefault();

        console.log("add book...");

        addBook({ variables: { author, published, genres, title } });
        setTitle("");
        setPublished("");
        setAuthor("");
        setGenres([]);
        setGenre("");
    };

    const addGenre = () => {
        setGenres(genres.concat(genre));
        setGenre("");
    };

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    title
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    published
                    <input
                        type="number"
                        value={published}
                        onChange={({ target }) =>
                            setPublished(parseInt(target.value))
                        }
                    />
                </div>
                <div>
                    <input
                        value={genre}
                        onChange={({ target }) => setGenre(target.value)}
                    />
                    <button onClick={addGenre} type="button">
                        add genre
                    </button>
                </div>
                <div>genres: {genres.join(" ")}</div>
                <button type="submit">create book</button>
            </form>
        </div>
    );
};

export default NewBook;
