import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import '../../assets/css/editform.css'
import profileF from '../../assets/images/landingpage/profileF.jpg'
import profileM from '../../assets/images/landingpage/profileM.jpg'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'

export default function EditProfile() {
  const navigate = useNavigate();
  const id = useParams().id;
  const userId = localStorage.getItem("id");
  const[user,setUser] = useState({});
  const [selectedImage, setSelectedImage] = useState(null); 
  
  const {register,handleSubmit,formState:{errors},setValue} = useForm({
    defaultValues:async()=>{
      const res = await axios.get("/user/"+id);
      return res.data.data;
    }
  });

  const getUserById = async()=>{
    const res = await axios.get("/user/" + id)
    setUser(res.data.data)
    // console.log("user data")
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Image preview
      setValue("image", file); // Correct way to store file in useForm
    }
  };

  const submitHandler = async(data) => {
      try{
        data.userId = localStorage.getItem("id");
        delete data._id;
        
        console.log(data);

        const formData = new FormData();
        formData.append("firstName",data.firstName);
        formData.append("lastName",data.lastName);
        formData.append("age",data.age);
        formData.append("image",data.image);
        formData.append("email",data.email);
        formData.append("gender",data.gender);
        formData.append("contact",data.contact);

        // const res = await axios.put(`/user/updateuser/${id}`,formData);
        const res = await axios.put(`/user/updateuser/${userId}`, formData);
        console.log(res.data.data);
        
        if(res.status === 200){
          toast.success("profile updated Successfully", {theme: "colored"});
          setTimeout(()=>{
            navigate(`/user/${id}`);
          },2000)
        }
      }catch(err){
         console.log(err);
      }
  };

  useEffect(()=>{
      getUserById();
    },[]);

  return (
    
    <div className='edit-container'>
      <ToastContainer position="top-right" autoClose={2000} />
     <div className='edit-form-container'>
      <h1 className='update-heading'>Update your Profile</h1>
      <form>
      <div className='edit-cover-img'>
          <div className='edit-profile-content'>
            <div className='edit-profile-pic'> 
              <img
                src={selectedImage || user?.profilePic || (user?.gender === "female" ? profileF : profileM)}
                alt="Profile"
              />
              <div className='edit-icon'>
               <i class="fa-solid fa-camera" onClick={() => document.querySelector(".file-inp").click()}></i>
               <input type="file" accept="image/*" className='file-inp' {...register("image")} onChange={handleImageChange} />
              </div>  
            </div>   
          </div>
        </div>
      
        <div>
          <label htmlFor="firstName">First Name :</label>
          <input type="text"  id="firstName" {...register("firstName",{required:true})} />
        </div>
        <div>
          <label htmlFor="lastName">Last Name :</label>
          <input type="text"  id="lastName" {...register("lastName",{required:true})} />
        </div>
        <div>
          <label htmlFor="email">Email :</label>
          <input type="email"  id="email" {...register("email",{required:true})} />
        </div>
        <div>
          <label htmlFor="age">Age :</label>
          <input type="number"  id="age" {...register("age",{required:true})}/>
        </div>
        <div>
        <label htmlFor="gender">Gender :</label>
          <select {...register("gender",{required:true})}>
            <option  disabled selected >Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label htmlFor="contact">Contact :</label>
          <input type="tel"  id="contact" {...register("contact",{required:true})} />
        </div>
        <div className='edit-btns'>
          <button className='update-btn' onClick={handleSubmit(submitHandler)}>Update</button>
        </div>
      </form>
     </div>
     
    </div>
    
  )
}
