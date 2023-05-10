import React, { useEffect, useState } from "react";
import { profileDataByID } from "../../service/api.service";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";
import moment from "moment";

function Profile() {
  const navigate = useNavigate();
  const [profileData,setProfileData] = useState([]);
  useEffect(() => {
    profileDataHandler();
  }, []);

  const profileDataHandler = async () => {
    const id = localStorage.getItem("userId");
    const DataByID = await profileDataByID(id);
    console.log("dataById", DataByID);

    if(DataByID.sucess){
      setProfileData(DataByID.data);
    }

    if(DataByID.message == "user unauthorized"){
      navigate('/login');
    }
  };

  console.log("profileData",profileData);
  return (
    <div>
      <div class="center">
        <div class="title">
          <h2>MY PROFILE</h2>
        </div>
        <div class="card">
          <div class="profile-container">
            <img
              src={profileData.userImg}
              alt="#"
            />
          </div>

          <div class="name-container">
            <h2>{profileData.fullName}m</h2>
            <p>{profileData.email}</p>
          </div>

          <div class="details-container">
            <div class="posts-container">
              <h4>Phone Number</h4>
              <p>{profileData.phoneNumber}</p>
            </div>

            <div class="follower-container">
              <h4>Birth date </h4>
              <p>{moment(profileData.dob).format("DD-MM-YYYY")}</p>
            </div>

          </div>

          <div class="cta">
            <Link to="/dashboard">
              <p>Back</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
