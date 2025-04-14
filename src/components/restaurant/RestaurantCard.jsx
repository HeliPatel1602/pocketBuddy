import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactStars from "react-rating-stars-component"
import '../../assets/css/restaurantcard.css'
import { toast, ToastContainer } from 'react-toastify';

export default function RestaurantCard() {
    const navigate = useNavigate();
    const {id} = useParams();
    const userId = localStorage.getItem("id");
    const role = localStorage.getItem("role");

    const [restaurant,setRestaurant] = useState({});
    const [ratingVal,setRatingVal] = useState(0);
    const [isEditable,setIsEditable] = useState(true);
    const [avgRating,setAvgRating] = useState(0);
    const [activeTab,setActiveTab] = useState("details");
    const [offers,setOffers] = useState({});
 
    const addRating = async(value) => {
      const res = await axios.post("rating/add",{rating:value,locationId:id,userId:userId});
      // console.log(res.data.data);
      setRatingVal(value);
      toast.success("Thanks for Rating", {theme: "colored"});
    }

    const getRating = async() => {
      const res = await axios.get(`rating/getratingbylocationidanduserid/${id}`,{params:{userId}})
      // console.log(res.data.data);
      setRatingVal(res.data.data[0].rating);
      if(res.data.data[0].rating > 0){
      setIsEditable(false);
      }else{
        setIsEditable(true)
      }
    }

    const getAvgRating = async() => {
      const res = await axios.get(`rating/getratingbylocationid/${id}`);
      if(res.data.data.length === 0){
        setAvgRating("0.0");
        return;
      }

      const total = res.data.data.reduce((sum, rating) => sum + rating.rating, 0);
      let avg = (total / res.data.data.length).toFixed(1);
      avg = Math.min(avg, 5);
      console.log(avg);
      setAvgRating(avg);
      
    }

    const getOfferByLocation = async() => {
      const res = await axios.get("/offer/getofferbylocationid/"+id);
      console.log(res.data.data);
      setOffers(res.data.data);
    }

    const getLocationById = async()=> {
        const res = await axios.get("/location/getlocationbyid/"+id);
        // console.log(res.data.data[0])
        setRestaurant(res.data.data[0]);
        // console.log(restaurant)
        getRating();
        getAvgRating();
        getOfferByLocation();
    }

    const goToAddOffer = ()=>{
      navigate("/restaurants/"+id+"/addOffer");
    }

    useEffect(()=>{
        getLocationById();
    },[])
    
  return (
    <>
    <div className='restaurant-card-details'>
    <ToastContainer position="top-right" autoClose={2000} />
      <h2 className='restaurant-card-title'>{restaurant.title}</h2>

      <div className="image-container">
        <img src={restaurant.locationPic} alt="" className="restaurant-card-pic" />
        <div className="average-rating">{avgRating}  <i className="fa fa-star"></i></div>
      </div>
 
      <div className="tabs">
        <div className='tab-btns'>
        <button
          className={activeTab === "details" ? "active-tab" : "inactive-tab"}
          onClick={() => setActiveTab("details")}>
          Restaurant Details
        </button>
        <button
          className={activeTab === "offers" ? "active-tab" : "inactive-tab"}
          onClick={() => setActiveTab("offers")}>
          Offers
        </button>
        </div>
      
      <div className="detail-content">
        {activeTab === "details" ? (
          <div>
            <p className='restaurant-address'>Address : {restaurant.address}, {restaurant?.areaId?.name}, {restaurant?.cityId?.name}, {restaurant?.stateId?.name}</p>
            <p className='restaurant-pincode'>Pincode: {restaurant?.areaId?.pincode}</p>
            <div className='restaurant-contact'>contact: {restaurant.contact}</div>
            <div className='restaurant-timings'>Timings: {restaurant.timings}</div>
            <div className='restaurant-card-description'>{restaurant.description}</div>
            <div className='restaurant food-type'>Food Type: {restaurant.foodType}</div>

            <div className='rating-container'>
              <div>Rate us:</div>
              <ReactStars
                key={ratingVal}
                count={5}
                value={ratingVal}
                precision={0.5}
                onChange={addRating}
                size={35}
                edit={isEditable}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
              />
            </div>
          </div>
        ) : (
          <div>
            {offers?.filter((offer) => {
              const today = new Date();
              const startDate = new Date(offer.startDate);
              const endDate = new Date(offer.endDate);
              return startDate <= today && endDate > today;
              })
            .map((offer)=>{
              return(
                <div key={offer._id} className='offer-details'>
                  <p className='offer-title'>{offer.title}</p>
                  <p className='offer-description'>{offer.description}</p>
                  <p className='offer-endDate'>Expires on : {new Date(offer.endDate).toLocaleDateString("en-GB")}</p>
                  <hr />
                </div>
              );
            })}
            <button onClick={goToAddOffer} className='offer-btn'>ADD Offer</button>
          </div>
        )}
      </div>
      </div>
    </div>
    
    </>

    
  )
}
