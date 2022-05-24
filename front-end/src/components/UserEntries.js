import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";

const API = process.env.REACT_APP_API_URL;
// const parseISO = require('date-fns/parseISO');

export default function UserEntries (){
    const [userEntries, setUserEntries] = useState([]);
    
    let {id} = useParams();
    let navigate = useNavigate();
    
    useEffect(()=>{
        axios.get(`${API}/users/${id}/entries`)
        .then((res)=> {
            // console.log(res.data);
            if(res.data){
                setUserEntries(res.data)
            } else {
                navigate("/not-found")
            }
        })
    }, [id, navigate]);

    
    let displayUserEntries = userEntries.map((entry, index)=>{
        let formattedDate = format(parseISO(entry.date_created), "MM/dd/yyyy HH:mm");
        let linkToEntry = `/entries/${entry.id}`;
        return(
            <div className='usEntri' key = {index} >
                <Link to={linkToEntry}>
                <h3>Date Created: {formattedDate}</h3>
                <h3>Mood: {entry.mood}</h3>
                <h3>Interest: {entry.interest}</h3>
                <h3>Activity: {entry.activity}</h3></Link>
                <br />
            </div>
        )
    })
    

    return(
        <div>
            {userEntries.length ? displayUserEntries : "No Entries"}
        </div>
    )
}