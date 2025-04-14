import React, { useEffect, useState } from 'react'
import '../../assets/css/restaurantpanel.css'
import { Link, useNavigate } from 'react-router-dom'
import axios, { all } from 'axios';
import { toast, ToastContainer } from 'react-toastify';

export default function RestaurantPanel() {

  const userId = localStorage.getItem("id");

  const navigate = useNavigate();
  const [activeTab,setActiveTab] = useState("my-restaurants");
  const [restaurants,setRestaurants] = useState([]);
  const [offers, setOffers] =  useState([]);
  const [forceUpdate, setForceUpdate] = useState(false);
  
  const getAllRestaurant = async() => {
    const res = await axios.get("/location/getlocationbyownerid/"+userId);
    console.log(res.data.data);
    setRestaurants(res.data.data);
    
    
  }

  const fetchOffers = async () => {
    const locationIds = [...new Set(restaurants.map(r => r._id))];
    console.log("Extracted Location IDs:", locationIds);

    if (locationIds.length === 0) {
     console.log("No restaurant IDs found, skipping API calls.");
     return;
    }

    const offerRequests = await Promise.all(
    locationIds.map(async (id) => {
    try {
      const response = await axios.get(`/offer/getofferbylocationid/${id}`);
      console.log(`Response for location ${id}:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching offers for location ${id}:`, error);
      return { data: [] }; 
    }
    }));

   const allOffers = offerRequests
    .map(offer => offer.data)
    .flat();

    console.log("Final Combined Offers:", allOffers);
    setOffers(allOffers);
  };

  const showRestCard = (locationId) => {
    navigate("/restaurants/"+locationId);
  }

  const goToHome = ()=> {
    navigate("/");
  }

  const deleteOffer = async(offerId) => {
    const res = axios.delete(`/offer/deleteoffer/${offerId}`);
    toast.success("Offer Deleted",{theme:"colored"});
    setTimeout(()=>{
      navigate(0);
    },2000)
  }

  useEffect(()=>{
    getAllRestaurant();  
  },[]);

  return (
    <div className='rest-owner-panel-container'>
      <ToastContainer position="top-right" autoClose={2000}/>
      <nav className='panel-navbar'>
        <h1 onClick={goToHome}>foodiBuddy</h1>
        <div className='nav-links'>
        <Link className='nav-link' onClick={()=>{setActiveTab("my-restaurants")}} >My Restaurants</Link>
        <Link className='nav-link' onClick={()=>{setActiveTab("manage-offer");fetchOffers()}}>Manage Offers</Link>
        </div>
      </nav>
      
      <div className='panel-content'>
      {activeTab === "my-restaurants" ? (
        <>
        <div className='restaurant-card-container'>
        {restaurants.map((rest) => (
          <div key={rest._id} className='restaurant-card' onClick={()=>{showRestCard(rest._id)}}>
            <img src={rest.locationPic} alt="" className='restaurant-pic' />
            <h3 className='restaurant-title'>{rest.title}</h3>
            <div className='restaurant-details'>
            <p className="restaurant-location">{rest?.cityId.name} | {rest?.stateId.name}</p>
            </div>
          </div>
        ))}
      </div>
        </>
      ):(
        <>
        <div className='manage-offer-container'> 
          <h2>Offers</h2>
          <table>
            <thead>
              <th>Title</th>
              <th>Description</th>
              <th>Restaurant Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Submited By</th>
              <th>Action</th>
            </thead>
          {offers.flat().map((offer)=>{
            return(
              <tr>
                <td>{offer.title}</td>
                <td>{offer.description}</td>
                <td>{offer.locationId.title}</td>
                <td>{new Date(offer.startDate).toLocaleDateString("en-GB")}</td>
                <td>{new Date(offer.endDate).toLocaleDateString("en-GB")}</td>
                <td>{offer.userId.firstName + " " + offer.userId.lastName }</td>
                <td><button className='delete-btn' onClick={()=>{deleteOffer(offer._id)}}>Delete</button></td>
              </tr>
            );
          })}
          </table>
        </div> 
        </>
      )}
      </div>
    </div>
  )
}
