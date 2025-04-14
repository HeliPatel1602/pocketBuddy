import React, { useState } from 'react'
import signupImg from '../../assets/images/signup.png'
import profileM from '../../assets/images/landingpage/profileM.jpg'
import '../../assets/css/signup.css'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Login'

export default function Signup({handleToggleSignup,handleToggleLogin}) {
  const [passwordVisible,setPasswordVisible] = useState(false);
  const {register,handleSubmit,formState:{errors}} = useForm();
  //navigation
  const navigate = useNavigate();

  const submitHandler = async(data)=>{
    console.log(data);
    data.roleId = "67c6ffa88b31c7982302676d"

    const res = await axios.post("/user",data)

    if(res.status === 201){
      toast.success("User Created Successfully",{theme: "colored"})
      setTimeout(()=>{
        handleToggleSignup();
        handleToggleLogin();
      },2000)
      
    }else{
      toast.error("User Not Created",{theme: "colored"})
    }

  }

  const showError = ()=>{
    if(errors.name){
      toast.error("Name is required",{theme: "colored"})
    }else if(errors.email){
      toast.error("Email is required",{theme: "colored"})
    }else{
      toast.error("Password is required",{theme: "colored"})
    }
  }

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  }


  return (
    <div className='signup-container'>
      <ToastContainer position="top-right" autoClose={2000}/>
      {/* <div className='signup-img'>
        <img src={signupImg} alt="signup-img" />
      </div> */}
     <div className='signup-form-container'>
      
      <form >
      <h1 className='signup-heading'>Sign up<i className="fa-solid fa-xmark" onClick={handleToggleSignup}></i></h1>
        <div>
            <label htmlFor="firstName">First Name<span>*</span></label>
            <input type="text"  id="firstName" placeholder='Enter your first name' {...register("firstName",{required:true})} />
        </div>
        <div>
            <label htmlFor="lastName">Last Name<span>*</span></label>
            <input type="text"  id="lastName" placeholder='Enter your last name' {...register("lastName",{required:true})} />
        </div>
        <div>
            <label htmlFor="email">Email<span>*</span></label>
            <input type="email"  id="email" placeholder='Enter your email' {...register("email",{required:true})} />
        </div>
        <div>
          <label htmlFor="gender">Gender<span>*</span></label>
          <select {...register("gender",{required:true})}>
            <option  disabled selected >Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
            <label htmlFor="contact">Contact<span>*</span></label>
            <input type="tel"  id="contact" placeholder='Enter your contact' {...register("contact",{required:true})} />
        </div>
        <div className='signup-password'> 
            <label htmlFor="pass">Password<span>*</span></label>
            <input type={passwordVisible ? "text" : "password"}  id="pass" placeholder='Enter password' {...register("password",{required:true})}/>
            <p onClick={togglePassword} className="signup-password-toggle-btn"><i className={passwordVisible ? "fa fa-eye" : "fa fa-eye-slash"}></i></p>
        </div>
        <div>
            <input type="submit" value="Sign up" className='signup-btn' onClick={handleSubmit(submitHandler,showError)}/>
        </div>
        <div>
          <p>Already have an account?</p>
          {/* <p><Link to="/login" className='login-link'>Login</Link></p> */}
          <button className='login-link' onClick={handleToggleLogin}>Login</button>
        </div>
      </form>
     </div>
    </div>
  )
}
