import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import NewUser from "../../src/pages/user-pages/NewUser.js";

const API = process.env.REACT_APP_API_URL;

// export default function NuUFormQuote(){
//     const [quote, setQuote] = useState([]);
//     useEffect(() => {
//         axios("https://type.fit/api/quotes")
//         .then(res => {
//           setQuote(res.data[Math.floor(Math.random() * 10)]);
//           console.log(res.data[Math.floor(Math.random() * 10)]);
//         })  
        
//     }, []);

export default function NewUserForm(){
    const [user, setUser] = useState({
        fname: "",
        lname: "",
        email: "",
        password: ""
    });
    
    let navigate = useNavigate();

    // const validateEmail = (email) => {
    //     return String(email)
    //       .toLowerCase()
    //       .match(
    //         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //       );
    //   }

const handleTextChange = (e) => {
    //email validation suggestion by Greg
    // if(e.target.id === "email" ){
    //     let results = validateEmail(e.target.value);
    //     if(results.length === 0){
    //          console.log("invalid");
    //         return
    //     }else{
    //         console.log("valid");
    //     }
    // }

    setUser({...user, [e.target.id]: e.target.value})
};

let userSignUp = {};
let userFirstName = {};

const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post(`${API}/users`, user)
         .then(res => {
            //  if(!res.data.id)){
                //  error here
            // }
            console.log(res);
            userSignUp = res.data.id;
            userFirstName = res.data.fname;
            localStorage.setItem("userid", userSignUp);
            localStorage.setItem("firstName", userFirstName);
            navigate("/");
        })
         .catch(error => console.log(error))
};

let { fname, lname, email, password } = user;

    return(
        <div className="newForm">
            <h1 id='descript' style={{'padding': '50px'}}> 🥰🤪😂🥳😬🙃😎🤩<p> Practice mindfulness with eMoodji! Reflect on your emotions and receive helpful therapeutic recommendations for relaxing activities/events going on near you ! </p></h1>
            <div>
                <form onSubmit={handleSubmit} style={{'color':'white'}} >
                <input style={{'margin':'25px'}}
                    id = "fname" 
                    value = {fname} 
                    type = "text" 
                    onChange = {handleTextChange} 
                    placeholder = "First Name"
                    required 
                />
            
                <input style={{'margin':'25px'}}
                    id = "lname"
                    value = {lname} 
                    type = "text" 
                    onChange = {handleTextChange} 
                    placeholder = "Last Name"
                    required />
                <br/>

                <input style={{'margin':'25px'}}
                    id = "nEmail"
                    value = {email} 
                    type = "email" 
                    onChange = {handleTextChange} 
                    placeholder = "Email"
                    required
                />
            
                <input style={{'margin':'25px'}}
                    id = "passWord"
                    value = {password} 
                    type = "password" 
                    onChange = {handleTextChange} 
                    placeholder = "Password"
                    required
                />
                <br />

                <button id='nSubmit' type="Submit" style={{'margin':'25px'}} >Create Account</button>
                </form>
                </div>
            </div>
    )
}