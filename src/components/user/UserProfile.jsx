import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../../assets/css/userProfile.css'
import profileF from '../../assets/images/landingpage/profileF.jpg'
import profileM from '../../assets/images/landingpage/profileM.jpg'
import profileBack from '../../assets/images/profileBack.jpeg'
import { Link, useNavigate } from 'react-router-dom';
import EditProfile from './EditProfile'

export default function UserProfile() {
  const navigate = useNavigate();
  const [user,setUser] = useState({});
  const [showPopup,setShowPopup] = useState(false);
  const [isLoggedIn,setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"));

  const getUserById = async()=>{
    const id = localStorage.getItem("id")
    const res = await axios.get("/user/" + id)
    setUser(res.data.data)
    // console.log("user data")
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleTogglePopup = () => {
    setShowPopup(!showPopup);
  };

  
  const capitalize = (name) => {
    return name ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() : "";
  };

  const goToHome = () => {
    navigate("/");
  }

  useEffect(()=>{
    if(isLoggedIn){
      getUserById();
    }
  },[])

  return (
    <div className='profile-main-container'>
      <nav className='profile-navbar'>
       <h1 className='logo' onClick={goToHome}>foodieBuddy</h1>
        <div className='profile-container'> 
          {user?.profilePic ? (
            <img
            src={user.profilePic}
            alt="Profile"
            className="profile-pic"
            onClick={handleTogglePopup}
            />
            ) : user?.gender === "female" ? (
              <img
              src={profileF}
              alt="profile-placeholder"
              className="profile-pic"
              onClick={handleTogglePopup}
              />
            ) : (
                <img
                src={profileM}
                alt="profile-placeholder"
                className="profile-pic"
                onClick={handleTogglePopup}
                />
            )}
            {user.firstName ? 
              (<p className='userName'>
                  {user.firstName} 
                  {!showPopup?
                    <i class="fa-solid fa-chevron-up" onClick={handleTogglePopup}></i>:
                    <i class="fa-solid fa-chevron-down" onClick={handleTogglePopup}></i>
                  }
              </p>) : (<></>)}
        </div>

        {showPopup && (
          <div className="profile-popup">
            <div className="popup-content">
              <ul className='user-popup'>
                <li className='user-popup-li'><button><Link to="/user" className='user-popup-opt'>Profile</Link></button></li>
                <li className='user-popup-li'><button  onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          </div>
        )}
      </nav> 

      
        <div className='cover-img'>
          <div className='user-profile-content'>
            <div className='user-profile-pic'>
              {user?.profilePic ? (
                <img
                src={user.profilePic}
                alt="Profile"
                // className="user-profile-pic"
                onClick={handleTogglePopup}
                />
                ) : user?.gender === "female" ? (
                     <img
                     src={profileF}
                     alt="profile-placeholder"
                    //  className="user-profile-pic"
                     onClick={handleTogglePopup}
                     />
                ) : (
                      <img
                      src={profileM}
                      alt="profile-placeholder"
                      //className="user-profile-pic"
                      onClick={handleTogglePopup}
                      />
                )}
              <h2 className="user-profile-name">{user?.firstName} {user?.lastName}</h2>
            </div>
            <Link to={`/user/editprofile/${user._id}`} className='edit-btn'><i class="fa-solid fa-pen-to-square"></i> Edit Profile</Link>
          </div>
        </div>

        <div className='user-details'>
          <h3>Personal Information</h3>
          <p><strong>Name : </strong>{capitalize(user.firstName) + " " + capitalize(user.lastName)}</p>
          <p><strong>Email : </strong>{user.email}</p>
          <p><strong>Age : </strong>{user.age}</p>
          <p><strong>Gender : </strong>{user.gender}</p>
          <p><strong>Contact : </strong>{user.contact}</p>
        </div>

        <footer>
        <div className='footer'>&copy; All rights reserved to foodieBuddy</div>
      </footer>
      
      {/* {showEdit?<EditProfile handleToggleEdit={handleToggleEdit} />:<></>} */}
    </div>
  )
}
