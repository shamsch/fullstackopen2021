/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import axios from 'axios';
import { useForm } from 'react-hook-form';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';

export default function AddEntry() {
    const { register, handleSubmit } = useForm();
    const [{ diagnoses, patient }] = useStateValue();


    const onSubmit = async (data: any) => {
        const entry = {
            ...data, diagnosisCode: [data.diagnosisCodes] 
        };

        try{
            console.log(patient, data);
            if(patient){
                const res = await axios.post(`${apiBaseUrl}/patients/${patient.id}/entries`, entry);
                console.log(res);
            }
        }
        catch(error){
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
            </select>
            <select {...register("healthCheckRating", { required: true })}>
                <option value={"0"}>Healthy</option>
                <option value={"LowRisk"}>1</option>
                <option value={"HighRisk"}>2</option>
                <option value={"CriticalRisk"}>3</option>
            </select>

            <input type="submit" />
        </form>
    );
}