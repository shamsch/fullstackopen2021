/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import axios from 'axios';
import { useForm } from 'react-hook-form';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';


export default function AddEntry() {
    const { register, handleSubmit, watch } = useForm();
    const [{ diagnoses, patient }] = useStateValue();
    const type = watch("type", "HealthCheck");



    const dataValid = (data: any) => {
        if (!data.description) {
            alert("description missing");
            return false;
        }
        else if (!Date.parse(data.date as string)) {
            alert("date not valid");
            return false;
        }
        else if (!data.specialist) {
            alert("specialist missing");
            return false;
        }
        else if (!data.diagnosisCodes) {
            alert("diagnosisCodes missing");
            return false;
        }
        else if (!data.type) {
            alert("type missing");
            if (data.type == "Hospital" && !Date.parse(data.dischargeDate as string)) {
                alert("discharge data not valid");
            }
            return false;
        }

        return true;
    };

    const onSubmit = async (data: any) => {
        try {
            if (patient && dataValid(data)) {
                if (data.type == "Hospital") {
                    const entry = {
                        ...data, discharge: {
                            date: data.dischargeDate,
                            criteria: data.criteria
                        }
                    };
                    const res = await axios.post(`${apiBaseUrl}/patients/${patient.id}/entries`, entry);
                    console.log(res);
                }
                else {
                    const res = await axios.post(`${apiBaseUrl}/patients/${patient.id}/entries`, data);
                    console.log(res);
                }
                window.location.reload();
            }
        }
        catch (error) {
            console.log(error);
        }

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Description" {...register("description", { required: true })} />
            <input type="text" placeholder="Date" {...register("date", { required: true })} />
            <input type="text" placeholder="Specialist" {...register("specialist", { required: true })} />
            <select {...register("diagnosisCodes", { required: true })}>
                {diagnoses.map((ele, index) => <option key={index}>{ele.code}</option>)}
            </select>
            <select {...register("type", { required: true })}>
                <option value="HealthCheck">Health check</option>
                <option value="Hospital">Hospital</option>
            </select>
            {type == "HealthCheck" ?
                <select {...register("healthCheckRating", { required: true })}>
                    <option value={"Healthy"}>0</option>
                    <option value={"LowRisk"}>1</option>
                    <option value={"HighRisk"}>2</option>
                    <option value={"CriticalRisk"}>3</option>
                </select> :
                <>
                    <input type="text" placeholder="Discharge data" {...register("dischargeDate", { required: true })} />
                    <input type="text" placeholder="Criteria" {...register("criteria", { required: true })} />
                </>
            }
            <input type="submit" />
        </form>
    );
}