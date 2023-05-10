import React, { useState } from "react";
import "./Register.css";
import dummy from "../../assets/images/Dummy.jpg";
import $ from "jquery";
import { userRegister } from "../../service/api.service";
import { useNavigate } from "react-router-dom";
import ErrorDisplay from "../ErrorDisplay";

function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [validateFlag, setValidateFlag] = useState(null);
  const [fileToShow, setFileToShow] = useState("");
  const [errorMsg,setErrorMsg] = useState("");
  const [fullNameError,setFullNameError] = useState("");
  const [emailError,setEmailError] = useState("");
  const [ppError,setPpError] = useState("");
  const [bodError,setBodError] = useState("");
  const [phoneNumberError,setPhoneNumberError] = useState("");
  const [passwordError,setPasswordError] = useState("");

  const uploadImageHandler = () =>{
    $('#hide_file').click()
  }

  const imageAcceptHandler = (e) =>{
    setFileToShow(URL.createObjectURL(e.target.files[0]));
    setProfilePicture(e.target.files[0]);
  }

  const validate = () =>{
    let validate = true;

    if(!fullName){
        setFullNameError("please enter fullName")
        validate = false;
    }

    if(!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)){
        setEmailError("please enter valid email");
        validate=false;
    }
    

    if(!profilePicture){
        setPpError("please select profile picture");
        validate = false;
    }


    if(!phoneNumber){
      setPhoneNumberError("please enter phone number");
        validate = false;
    }

    if(!password){
        setPasswordError("please enter password");
        validate = false;
    }

    if(!birthDate){
        setBodError("please select birthdate");
        validate = false;
    }

    return validate;

};

  const submitHandler = async () =>{
    if(validate()){
        let formData = new FormData();
        formData.append("fullName",fullName)
        formData.append("email",email)
        formData.append("phoneNumber",phoneNumber)
        formData.append("password",password)
        formData.append("dob",birthDate)
        formData.append("userImg",profilePicture)
    
        const userDataHandler = await userRegister(formData);
        console.log("12",userDataHandler);
        if(userDataHandler){
            if(userDataHandler.data.success){
                navigate('/login');
            }
        }else{
            setErrorMsg("something_went_wrong");
        }
    }
  } 

  return (
    <>
      <div className="container">
      <div className="title">Regristration</div>
      <div style={{marginTop:"20px",cursor:"pointer"}} onClick={uploadImageHandler}>
        <img src={fileToShow ? fileToShow :dummy} width={50} height={50}/>
         {ppError && <ErrorDisplay errorMsg={ppError}/>}
      </div>
      <form action="#">
        <div className="user-details">
            <input type="file" id="hide_file" style={{display:"none"}} onChange={(e)=>imageAcceptHandler(e)}/>
          <div className="input-box">
            <span className="deatils">Full Name</span>
            <input type="text" placeholder="Enter Your Name"  onChange={(e) =>setFullName(e.target.value)}/>
            {fullNameError && <ErrorDisplay errorMsg={fullNameError}/>}
          </div>
          <div className="input-box">
            <span className="deatils">Birth Date</span>
            <input type='date' value={birthDate} onChange={(e)=> setBirthDate(e.target.value)} />
            {bodError && <ErrorDisplay errorMsg={bodError}/>}
          </div>
          <div className="input-box">
            <span className="deatils">Email</span>
            <input type="text" placeholder="Enter Your Email" onChange={(e) =>setEmail(e.target.value)}/>
            {emailError && <ErrorDisplay errorMsg={emailError}/>}
          </div>
          <div className="input-box">
            <span className="deatils">Phone Number</span>
            <input type="text" placeholder="Enter Your Number" onChange={(e) =>setPhoneNumber(e.target.value)} />
            {phoneNumberError && <ErrorDisplay errorMsg={phoneNumberError}/>}
          </div>
          <div className="input-box">
            <span className="password">Password</span>
            <input type="text" placeholder="Enter Your Password" onChange={(e) =>setPassword(e.target.value)}/>
            {passwordError && <ErrorDisplay errorMsg={passwordError}/>}
          </div>
        </div>
        </form>
        {
            errorMsg  &&  <h3 style={{color:"red"}}> {errorMsg} </h3>
        }
        <div className="button">
          <input type="Submit" onClick={submitHandler} />
        </div>
    </div>
    </>
  );
}

export default Register;