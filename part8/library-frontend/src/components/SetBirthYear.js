import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import {
    CHANGE_AUTHOR_BORN,
    GET_ALL_AUTHORS,
    GET_ONLY_ALL_AUTHOR_NAME,
} from "../queries";

const SetBirthYear = () => {
    const [name, setName] = useState("");
    const [born, setBorn] = useState(0);

    const [changeBorn, result] = useMutation(CHANGE_AUTHOR_BORN, {
        refetchQueries: [{ query: GET_ALL_AUTHORS }],
    });

    const { data } = useQuery(GET_ONLY_ALL_AUTHOR_NAME);

    const author = data.allAuthours;

    if(!author){
        return null; 
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const setBornTo = born;
        changeBorn({ variables: { name, setBornTo } });
    };

    return (
        <div>
            <h3>change author birth year</h3>
            {/* {result.data && result.data.editAuthor == null? <div>author name does not exist</div>: null} */}
            <form onSubmit={handleSubmit}>
                <label>name</label>
                <br />
                <select onChange={(e)=> setName(e.target.value)}>
                    {author.map((e, idx) => (
                        <option key={idx}>{e.name}</option>
                    ))}
                </select>
                <br />
                <label>birth year</label>
                <br />
                <input
                    type="number"
                    value={born}
                    onChange={(e) => setBorn(parseInt(e.target.value))}
                />
                <br />
                <button>change</button>
            </form>
        </div>
    );
};

export default SetBirthYear;
