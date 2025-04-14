import React from 'react'
import '../../assets/css/aboutus.css'
import Img from '../../assets/images/aboutus/img3.jpg'
import Img2 from '../../assets/images/aboutus/img2.jpg'
import { Link } from 'react-router-dom'

export default function AboutUs() {
  return (
    <div className='aboutus-container'>
      <div className='aboutfirst-container'>
        <Link to="/" className='home-link'><h1>foodieBuddy</h1></Link>
        <img src={Img} alt="" className='first-img' />
        <h3>Better food for more people</h3>
        <p className='scroll-text'>Scroll for more</p>
      </div>
      
      <div className='aboutsecond-container'>
        <div className='about-text-container'>
          <h1 className='about-heading'>Who are we?</h1><br />
          <p className='about-text'>
          At FoodieBuddy, we are passionate about bridging the gap between restaurant owners and food lovers. Our platform is designed to create a seamless and engaging experience where businesses can showcase their best offers while users can discover amazing food deals effortlessly.We believe in a community-driven approach, empowering restaurant owners to promote their special deals and allowing users to contribute by sharing their own exciting finds. Our moderation system ensures that every offer is authentic and trustworthy, making FoodieBuddy a reliable and transparent space for food enthusiasts.With advanced search capabilities, real-time notifications, and an intuitive interface, FoodieBuddy is your go-to platform for finding the best restaurant deals near you. Whether you are a restaurant owner looking to attract more customers or a food lover hunting for the best discounts, FoodieBuddy is here to make your dining experiences more affordable and enjoyable.Join us and be a part of a revolutionary food discovery platform where great food meets great offers!
          </p>
        </div>
        <div className='about-sideimg'>
          <img src={Img2} alt="" />
        </div>
      </div>
      
      <footer>
        <div className='footer'>&copy; All rights reserved to foodieBuddy</div>
      </footer>
    </div>
  )
}
