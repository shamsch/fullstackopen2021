import { useStateValue } from "../state";

export const AddEntry = () => {
    const [{ diagnoses }] = useStateValue();
    return (
        <>
            <form>
                <label>description</label>
                <input />
                <br />
                <label>date</label>
                <input />
                <br />
                <label>specialist</label>
                <input />
                <br />
                <label>diagnosis code</label>
                <select>
                    {diagnoses.map((ele, index) => <option key={index}>{ele.code}</option>)}
                </select>
                <br />
                <label>entry type</label>
                <select>
                    <option>Health Check</option>
                    <option>Occupational Healthcare</option>
                    <option>Hospital Entry</option>
                </select>
                <br />
                <label>Health check rating</label>
                <select>
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
                <br />
                <button>submit</button>
            </form>
        </>
    );

};
