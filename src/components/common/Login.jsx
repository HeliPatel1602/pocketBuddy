import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import loginImg from '../../assets/images/login.png'
import '../../assets/css/loginform.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login({handleToggleLogin,handleToggleSignup}) {
  const [passwordVisible,setPasswordVisible] = useState(false);
    const {register,handleSubmit,formState : {errors}} = useForm();
    const navigate = useNavigate();

    const submitHandler = async(data)=>{
      // console.log(data);
      try{
       const res = await axios.post("/user/login",data)
       console.log(res.data)
       if(res.status === 200){
        toast.success("Login Successfully", {theme: "colored"});
        localStorage.setItem("id",res.data.data._id)
        localStorage.setItem("role",res.data.data.roleId.name)
        localStorage.setItem("isLoggedIn",true)


        if(res.data.data.roleId.name === "USER"){
          setTimeout(()=>{
            handleToggleLogin();
            navigate(0);
          },2000);
        }else if(res.data.data.roleId.name === "LOCATIONOWNER"){
          setTimeout(()=>{
            handleToggleLogin();
            navigate("/restaurantOwner/dashbord");
          },2000);
        }
       }
      }catch(err){
        if(err.response){
          if(err.response.status === 404){
            toast.error("Invalid email or password", { theme: "colored" });
          }
        }else{
          toast.error("Something went wrong!", { theme: "colored" });
        }
      }
    }
     
    const showError =()=>{
      if(errors.email){
        toast.error("email is required", {theme: "colored"});
      }else if(errors.password){
        toast.error("password is required", {theme: "colored"});
      }
    }

    const togglePassword = () => {
      setPasswordVisible(!passwordVisible);
    }
  

  return (
    
    <div className='login-container'>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className='login-form-container'>
       <form>
       <h1 className='login-heading'>Login<i className="fa-solid fa-xmark" onClick={handleToggleLogin}></i></h1>
        <div>
            <label htmlFor="email">Email<span>*</span></label>
            <input type="email"  id="email" placeholder='Enter your Email' {...register("email", {required:true})} />
        </div>
        <div className='login-password'>
            <label htmlFor="pass">Password<span>*</span></label>
            <input type={passwordVisible ? "text" : "password"}  id="pass" placeholder='Enter your Password' {...register("password", {required:true})} />
            <p onClick={togglePassword} className="login-password-toggle-btn"><i className={passwordVisible ? "fa fa-eye" : "fa fa-eye-slash"}></i></p>
        </div>
        
        <button type="submit" className='login-btn' onClick={handleSubmit(submitHandler, showError)}>Log in</button>
        <div className='forgot-password'>
          
          <p>new to foodieBuddy?<button className='signup-link' onClick={handleToggleSignup}>Signup</button></p>
          <p><Link to="/forgotpassword" className='forgot-pass-link'>Forgot password?</Link></p>
          
        </div>
       </form>
      </div>
      
    </div>
  )
}
