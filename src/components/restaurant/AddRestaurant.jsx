import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import '../../assets/css/addRestaurant.css'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function AddRestaurant() {

  const navigate = useNavigate();

  const [states,setStates] = useState([]);
  const [cities,setCities] = useState([]);
  const [areas,setAreas] = useState([]);

  const getAllStates = async () => {
    const res = await axios.get("/state/getallstates");
    console.log(res.data);
    setStates(res.data.data);
  };

  const getCityByStateId = async (id) => {
    const res = await axios.get("/city/getcitybystate/" + id);
    console.log("city.....", res.data);
    setCities(res.data.data);
  };

  const getAreaByCityId = async (id) => {
    const res = await axios.get("/area/getareabycity/" + id);
    setAreas(res.data.data);
  };

  useEffect(()=>{
    getAllStates();
  },[]);

  const {register,handleSubmit,formState:{errors},reset} = useForm();

  const submitHandler = async (data) => {
    
    try{
      const userId = localStorage.getItem("id");
      data.userId = userId;

      const formData = new FormData();
      formData.append("title",data.title);
      formData.append("category",data.category);
      formData.append("foodType",data.foodType);
      formData.append("description",data.description);
      formData.append("timings",data.timings);
      formData.append("latitude",data.latitude);
      formData.append("longitude",data.longitude);
      formData.append("address",data.address);
      formData.append("stateId",data.stateId);
      formData.append("cityId",data.cityId);
      formData.append("areaId",data.areaId);
      formData.append("image",data.image[0]);
      formData.append("ownerId",data.userId);

      const res = await axios.post("/location/add",formData);
      reset();
      updateRole(userId);
      if(res.status === 200){
        toast.success("Restaurant Added Successfully", {theme: "colored"});
      }

      setTimeout(()=>{
        navigate("/");
      },2000)

    }catch(err){
      console.log(err);
    }
  };

  const showError =()=>{
    if(errors.title){
      toast.error("Title is required", {theme: "colored"});
    }else if(errors.category){
      toast.error("Category is required", {theme: "colored"});
    }else if(errors.foodType){
      toast.error("FoodType is required", {theme: "colored"});
    }else if(errors.description){
      toast.error("Description is required", {theme: "colored"});
    }else if(errors.timings){
      toast.error("Timings is required",{theme: "colored"});
    }else if(errors.address){
      toast.error("Address is required",{theme: "colored"});
    }else if(errors.state){
      toast.error("state is required",{theme: "colored"});
    }else if(errors.city){
      toast.error("city is required",{theme: "colored"});
    }else if(errors.area){
      toast.error("area is required",{theme: "colored"});
    }else if(errors.image){
      toast.error("Image is required",{theme: "colored"});
    }
  }
 
  const updateRole = async(userId) => {
    const res = await axios.put(`/user/updaterole/${userId}`);
    console.log(res.data.data);
  }

  const goToHome = ()=> {
    navigate("/");
  }

  return (
    <div className='add-rest-main-container'>
    <nav className='add-rest-nav'>
      <h1 onClick={goToHome}>foodieBuddy</h1>
    </nav>
    <div className='add-rest-container'>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className='form-container'>
        <h1 className='main-heading'>Add Your Restaurant</h1>
        <div className='form-grid'>
        <form onSubmit={handleSubmit(submitHandler,showError)}>
          <div className='form-group'>
            <label htmlFor="title">Title<span>*</span></label>
            <input type="text" id="title" placeholder='Enter your title' {...register("title",{required:true})} />
          </div>
          <div className='form-group'>
            <label htmlFor="category">Category<span>*</span></label>
            <input type="text"  id="category" placeholder='Enter category (Ex. dining)' {...register("category",{required:true})} />
          
          
            <label htmlFor="foodType">Food Type<span>*</span></label>
            <input type="text"  id="foodType" placeholder='Enter Food Type' {...register("foodType",{required:true})} />
          
          
            <label htmlFor="description">Description<span>*</span></label>
            <input type="text"  id="description" placeholder='Enter Description' {...register("description",{required:true})} />

            <label htmlFor="timings">Timings<span>*</span></label>
            <input type="text"  id="timings" placeholder='Enter Timings' {...register("timings",{required:true})} />
          </div>
          <div className='form-group location'>
            <div className='lat-long'>
              <div>
               <label htmlFor="latitude">Latitude<span>*</span></label>
               <input type="text"  id="latitude" placeholder='Enter latitude' {...register("latitude",{required:true})} />
              </div>
              <div>
               <label htmlFor="longitude">Longitude<span>*</span></label>
               <input type="text"  id="longitude" placeholder='Enter longitude' {...register("longitude",{required:true})} />
              </div>
            </div>
            <div className='address-container'>
             <label htmlFor="address">Address<span>*</span></label>
             <textarea  id="address" placeholder='Enter address' {...register("address",{required:true})}></textarea>
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor="state">State<span>*</span></label>
            <select {...register("stateId")} 
            onChange={(event)=>{
               getCityByStateId(event.target.value);
            }}>
              <option>Select State</option>
              {states?.map((state) => {
                return <option value={state._id}>{state.name}</option>;
              })}
            </select>
          
          
            <label htmlFor="city">City<span>*</span></label>
            <select {...register("cityId")} 
            onChange={(event)=>{
               getAreaByCityId(event.target.value);
            }}>
              <option>Select City</option>
              {cities?.map((city) => {
                return <option value={city._id}>{city.name}</option>;
              })}
            </select>
          
          
            <label htmlFor="area">Area<span>*</span></label>
            <select {...register("areaId")}>
              <option>Select Area</option>
              {areas?.map((area) => {
                return <option value={area._id}>{area.name}</option>;
              })}
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor="pic">Select Your Restaurant Picture<span>*</span></label>
            <input type="file" accept="image/*" id="pic" {...register("image",{required:true})} />
          </div>
          <div>
            <input type="submit" value="ADD" className='submit-btn' />
          </div>
        </form>
        </div>
      </div>
    </div>
    </div>
  )
}
