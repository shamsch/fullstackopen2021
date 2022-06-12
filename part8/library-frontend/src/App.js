import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import { Login } from "./components/Login";
import NewBook from "./components/NewBook";
import Recommendation from "./components/Recommendation";

const App = () => {
    const [page, setPage] = useState("authors");
    const [token, setToken] = useState(null)

    return (
        <div>
            <div>
                <button onClick={() => setPage("authors")}>authors</button>
                <button onClick={() => setPage("books")}>books</button>
                {token && <button onClick={() => setPage("add")}>add book</button>}
                {token && <button onClick={() => setPage("recommendation")}>recommendation</button>}
                <button onClick={() => setPage("login")}>login</button>
            </div>

            <Authors show={page === "authors"} />

            <Books show={page === "books"} />

            <NewBook show={page === "add"} />

            <Recommendation show={page==="recommendation"}/>

            <Login show={page === "login"} setToken={setToken}/>

        </div>
    );
};

export default App;
