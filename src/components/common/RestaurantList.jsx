import React, { useEffect, useRef, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import profileF from '../../assets/images/landingpage/profileF.jpg'
import profileM from '../../assets/images/landingpage/profileM.jpg'
import '../../assets/css/restaurantlist.css'
import axios from 'axios'
// import { div, h2 } from 'framer-motion/client';

export default function RestaurantList() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const isChildRoute = location.pathname !== "/restaurants";
  const [user,setUser] = useState({});
  const [showPopup,setShowPopup] = useState(false);
  const [isLoggedIn,setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"));
  const [restaurants,setRestaurants] = useState([]);
  const [city,setCity] = useState("");
  

  const id = localStorage.getItem("id");
  
  const getUserById = async()=>{
    const res = await axios.get("/user/" + id);
    setUser(res.data.data);
  }

  const getCityId = async()=> {
     const res = await axios.get("/city/getcityidbyname/"+city);
     console.log(res.data.data);
     getLocationByCityId(res.data.data);
  }

  const getLocationByCityId = async(id)=>{
    const res = await axios.get("/location/getlocationbycityid/"+id);
    setRestaurants(res.data.data);
  }

  
  const getAllRestaurant = async() => {
    const res = await axios.get("/location/getall");
    setRestaurants(res.data.data);
    // console.log("rest",restaurants);
  }

  const showRestCard = (locationId) => {
    navigate("/restaurants/"+locationId);
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

  useEffect(()=>{
      if(isLoggedIn){
        getUserById();
      }
      getAllRestaurant();
    },[])

  const goToHome = () => {
    navigate("/");
  }
  return (
    <div className='rest-container'>
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
                <li className='user-popup-li'><button><Link to={`/user/${user._id}`} className='user-popup-opt'>Profile</Link></button></li>
                <li className='user-popup-li'><button  onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          </div>
        )}
      </nav> 

      <Outlet />

      {!isChildRoute && (
      <>
      <div className='city-inp-container'>
        <i class="fa-solid fa-location-dot"></i>
        <input type="text"  id="city" className='city-inp' placeholder='Enter Your City' value={city}
         onChange={(e)=>{
          const input = e.target.value;
          setCity(capitalize(input));
         }} />
        <button className='city-inp-btn' onClick={getCityId}>Get Restaurants</button>
      </div>

      <div className='restaurant-card-container'>
        {restaurants.map((rest) => (
          <div key={rest._id} className='restaurant-card' onClick={()=>{showRestCard(rest._id)}}>
            <img src={rest.locationPic} alt="" className='restaurant-pic' />
            <h3 className='restaurant-title'>{rest.title}</h3>
            <div className='restaurant-details'>
            <p className='restaurant-description'>{rest.description}</p>
            <p className="restaurant-location">{rest.cityId.name} | {rest.stateId.name}</p>
            </div>
          </div>
        ))}
      </div>
      </>
      )}
      
      <footer>
        <div className='footer'>&copy; All rights reserved to foodieBuddy</div>
      </footer>
    </div>
  )
}
