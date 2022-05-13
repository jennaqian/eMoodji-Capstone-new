import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function UserDetails(){
    const [user, setUser] = useState([]);
    let { id } = useParams();
    // let navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API}/users/${id}`)
            .then(res => setUser(res.data))
            .catch(error => console.log(error))
    }, [id]);

    // const handleDelete = () => {
    //     axios.delete(`${API}/users/${id}`)
    //         .then(res => navigate("/users"))
    //         .catch(error => console.log(error))
    // };

    let { fname, lname, email, password, uid } = user;

    return(
        <article className="User">
            <Link to={`/users/${id}`}>
                <div>
                    <h3>First name: {fname}</h3>
                    <h3>Last name: {lname}</h3>
                    <h3>Email: {email}</h3>
                    <h3>Password: {password}</h3>
                    <h3>User ID: {uid}</h3>
                </div>
            </Link>

        </article>
    )
}