import React from 'react'
import '../../assets/css/addoffer.css'
import { toast, ToastContainer } from 'react-toastify'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddOffer() {
    const navigate = useNavigate();
    const userId = localStorage.getItem("id");
    const {id} = useParams();
    const {register,handleSubmit,formState : {errors}} = useForm();
    
    const submitHandler = async(data)=>{
        const newData = {...data,
            userId:userId,
            locationId:id
        }
        const res = await axios.post("/offer/add",newData);
        console.log(res.data.data);
        if(res.status === 200){
            toast.success("offer saved",{theme:"colored"});
        }
        setTimeout(()=>{
            navigate(`/restaurants/${id}`);
        },2000)
    }

    const showError =()=>{
        if(errors.title){
            toast.error("Title is required", {theme: "colored"});
        }else if(errors.description){
            toast.error("Description is required", {theme: "colored"});
        }else if(errors.startDate){
            toast.error("Start date is required", {theme: "colored"});
        }else{
            toast.error("End date is required", {theme: "colored"});
        }
    }

  return (
    <div className='offer-container'>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className='offer-form-container'>
        <h1 className='offer-heading'>Add Offer</h1>
       <form>
        <div>
            <label htmlFor="title">Offer Title<span>*</span></label>
            <input type="text"  id="title" placeholder='Enter offer title' {...register("title", {required:true})} />
        </div>
        <div>
            <label htmlFor="description">Description<span>*</span></label>
            <input type="text"  id="" placeholder='description' {...register("description", {required:true})} />
        </div>
        <div>
            <label htmlFor="start-date">Start Date<span>*</span></label>
            <input type="date"  id="start-date" placeholder='Enter Start Date' {...register("startDate",{required:true})} />
        </div>
        <div>
            <label htmlFor="end-date">End Date<span>*</span></label>
            <input type="date"  id="end-date" placeholder='Enter End Date' {...register("endDate",{required:true})} />
        </div>
        
        <button type="submit" className='add-offer-btn' onClick={handleSubmit(submitHandler, showError)}>Add Offer</button>

       </form>
      </div>
      
    </div>
  )
}
