import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../assets/css/landingpage/landingpage.css'
import Img1 from '../../assets/images/landingpage/img1.jpg'
import profileM from '../../assets/images/landingpage/profileM.jpg'
import profileF from '../../assets/images/landingpage/profileF.jpg'
import axios from 'axios';
import Login from './Login'
import Signup from './Signup'

export default function LandingPage () {
  const [showPopup,setShowPopup] = useState(false);
  const [showLogin,setShowLogin] = useState(false);
  const [showSignup,setShowSignup] = useState(false);
  const [user,setUser] = useState({})
  const [isLoggedIn,setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"));

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
  };

  const handleTogglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleToggleLogin = () => {
    setShowSignup(false);
    setShowLogin(!showLogin);
  }

  const handleToggleSignup = () => {
    setShowLogin(false);
    setShowSignup(!showSignup);
  }

  const handleAddOfferClick = (event) => {
    if (!isLoggedIn) {
      event.preventDefault(); // Stop navigation
      setShowLogin(true) // Show login popup
    }
  };


  const getUserById = async()=>{
    const id = localStorage.getItem("id")
    const res = await axios.get("/user/" + id)
    setUser(res.data.data)
    // console.log("user data")
  }

  const handleClickOutside = (event) => {
    if (!event.target.closest(".profile-container")) {
      setShowPopup(false);
    }
  };

  useEffect(()=>{
    if(isLoggedIn){
     getUserById();
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
    
  },[])
  
  return (
    <div className='main-container'>
      {!isLoggedIn ?(
        <>
          <nav className='navbar'>
            {/* <h1 className='logo'>foodieBuddy</h1> */}
            <div className='nav-links'>
              <Link to="/addrestaurant" className='nav-link' onClick={handleAddOfferClick}>Add Restaurant</Link>
              <Link to="/aboutus" className='nav-link'>About us</Link>
              <button className='nav-link nav-btn' onClick={handleToggleLogin}>Login</button>
              <button className='nav-link nav-btn' onClick={handleToggleSignup}>Signup</button>
        </div>
      </nav>
        </>
      ) : (
        <>
          <nav className='navbar'>
            <div className='nav-links'>
              <Link to="/addrestaurant" className='nav-link'>Add Restaurant</Link>
              <Link to="/aboutus" className='nav-link'>About us</Link>
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
                {user.firstName ? (<p className='userName'>
                  {user.firstName} 
                  {!showPopup?
                    <i class="fa-solid fa-chevron-up" onClick={handleTogglePopup}></i>:
                    <i class="fa-solid fa-chevron-down" onClick={handleTogglePopup}></i>
                  }
                  </p>) : (<></>)}
                

              </div>
            </div>
            {showPopup && (
               <div className="profile-popup">
                  <div className="popup-content">
                    <ul className='user-popup'>
                      <li className='user-popup-li'><button><Link to={`/user/${user._id}`} className='user-popup-opt'>Profile</Link></button></li>
                      <li className='user-popup-li'><button  onClick={handleLogout}>Logout</button></li>
                    </ul>
                  </div>
                </div>
            )}
          </nav>
        </> 
      )}
      
      

      <div className='hero'>
        <div className='content'>
            <h1 className='hero-title'>foodieBuddy</h1>
            <p className='hero-text'>Discover the best food offers</p>
            <div>
              <button className='get-started-btn'><Link to="/restaurants" className='get-started-btn' onClick={handleAddOfferClick}>Get started</Link></button>
            </div>
          </div>
          <div className='img-container'>
            <img src={Img1} alt="food-img" />
          </div>
      </div>

      <footer>
        <div className='footer'>&copy; All rights reserved to foodieBuddy</div>
      </footer>
      {showLogin?<Login handleToggleLogin={handleToggleLogin} handleToggleSignup={handleToggleSignup}/> : <></>}
      {showSignup?<Signup handleToggleSignup={handleToggleSignup} handleToggleLogin={handleToggleLogin} />:<></>}
    </div>

    
  )
}
