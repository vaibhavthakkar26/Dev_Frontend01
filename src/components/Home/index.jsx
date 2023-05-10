import React, { useEffect, useState } from 'react'
import { getuserData } from '../../service/api.service';
import DataTable from './DataTable';
import { useNavigate } from "react-router-dom";
import { Link, NavLink } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [userData,setUserData] = useState([]);
  const [errorMessage,SetErrorMessage] = useState("");

  useEffect(()=>{
    getDataHandler()
  },[]);

  const getDataHandler = async (name) =>{
    const data = await getuserData(name);
    console.log("daTa",data);

    if(data.sucess){
      setUserData(data.data);
    }else{
      setUserData(null);
      SetErrorMessage(data.message);
      if(data.message == 'user unauthorized'){
        navigate('/login');
      }
    }
  }

  const searchhandler = (e) =>{
    if(e.target.value.length > 3){
      const searchData =e.target.value;
      getDataHandler(searchData);
    }
    if(e.target.value.length == 0){
      getDataHandler();
    }
  }

  return (
    <div>
        <div style={{marginBottom:"20px",display:"flex",justifyContent:"flex-end",textAlign:"center"}} >
          <div style={{display:"flex",gap:"20px"}}>
          <input type='text' placeholder='search' width={100} height={100} onChange={searchhandler}/>
            <NavLink to="/my-profile">
              <h3>My profile</h3>
            </NavLink>
          </div>
        </div>
        <DataTable userData={userData}/>
    </div>
  )
}

export default Home
