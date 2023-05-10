import React, { useState } from 'react'
import "./login.css";
import { loginUser } from '../../service/api.service';
import { useNavigate } from "react-router-dom";
import ErrorDisplay from '../ErrorDisplay';

function Login() {
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [passwordError,setPasswordError] = useState("");
  const [emailError,setEmailError] = useState("");
  const [errorMsg,setErrorMsg] = useState("");


  const validate = () =>{
    let validate = true;
    if(!password){
      setPasswordError("please enter password");
      validate = false;
    }

    if(!email){
      setEmailError("please enter email");
      validate = false;
    }

    return validate;
  }

  const loginHandler = async () =>{
    if(validate()){
      const data ={email,password}
      const loginHandler = await loginUser(data);
      if(loginHandler){
        if(loginHandler.data.success){
          const token = loginHandler.data.data.token;
          const userId = loginHandler.data.data.userId;
          localStorage.setItem("userId",userId);
          localStorage.setItem('token',token);
          navigate('/dashboard');
        }
      }else{
        setErrorMsg("something_Went_Wrong");
      }
    }

    

    
  }
  return (
    <div className="container">
      <div className="title">Login</div>
      <form action="#">
        <div className="user-details">
          <div className="input-box-login">
            <span className="deatils">Email</span>
            <input type="text" placeholder="Enter Your Email" onChange={(e) =>setEmail(e.target.value)}/>
            {emailError && <ErrorDisplay errorMsg={emailError}/>}
          </div>
          <div className="input-box-login">
            <span className="deatils">Password</span>
            <input type="password" placeholder="Enter Your Password" onChange={(e) =>setPassword(e.target.value)}/>
            {passwordError && <ErrorDisplay errorMsg={passwordError}/>}
          </div>
        </div>
        </form>
        {
          errorMsg && <h3> {errorMsg} </h3>
        }
        <div className="button">
          <input type="Submit" onClick={loginHandler} />
        </div>
    </div>
  )
}

export default Login
