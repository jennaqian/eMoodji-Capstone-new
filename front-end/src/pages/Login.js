import { useState, useEffect} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

export default function Login(){
    const [quote, setQuote] = useState([]);
    const [user, setUser] = useState({
        id: null,
        email: "",
        password: "",
    });
    let navigate = useNavigate();

    useEffect(() => {
        axios("https://type.fit/api/quotes")
        .then(res => {
          setQuote(res.data[Math.floor(Math.random() * 50)]);
        });
    }, []);

    const handleTextChange = (e) => {
        setUser({...user, [e.target.id]: e.target.value})
    }

    let userFirstName = "";
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${API}/users/loginpage`, user)
         .then(res => {
            userFirstName = res.data.fname;
            setUser({...user, id: res.data.id});
            localStorage.setItem("userid", res.data.id);
            localStorage.setItem("firstName", userFirstName);
            navigate("/");
        })
        .catch(error => alert("Invalid email and/or password!"))
    }
    
    return(
        <div className='login'>
            <div className="login-container">

                <div className="login-image-container">
                    <h1>"{quote.text}" <br /> </h1>
                    <h2>{quote.author ? quote.author : "Unknown"}</h2>
                </div>

                <div className="login-form-container">
                    <form onSubmit={handleSubmit} >
                        <h2>Already a Member?</h2>
                        <input
                            id = "email"
                            value = {user.email} 
                            type = "email" 
                            onChange = {handleTextChange} 
                            placeholder="Email"
                            required
                        />
                    
                        <input 
                        id = "password"
                        value = {user.password}
                        type = "password"
                        onChange = {handleTextChange} 
                        placeholder="Password"
                        required
                        />

                        <button id='confirm-login' type="submit" >Log In</button>
                    </form>
                    <div className="register">
                        Dont have an account yet?
                        <Link to="/createaccount"> Create An Account Now!</Link> 
                    </div>
                </div>
            </div>
        </div>
    )
}