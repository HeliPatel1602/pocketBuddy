// import './assets/css/adminlte.css'
// import './assets/css/adminlte.min.css'
import { Route, Routes } from 'react-router-dom'
import Login from './components/common/Login'
import Signup from './components/common/Signup'
import AddOffer from './components/restaurant/AddOffer'
import axios from 'axios'
import AddRestaurant from './components/restaurant/AddRestaurant'
import PrivateRoutes from './hooks/PrivateRoutes'
import LandingPage from './components/common/LandingPage'
import AboutUs from './components/common/AboutUs'
import ForgotPassword from './components/common/ForgotPassword'
import UserProfile from './components/user/UserProfile'
import EditProfile from './components/user/EditProfile'
import RestaurantList from './components/common/RestaurantList'
import RestaurantCard from './components/restaurant/RestaurantCard'
import RestaurantPanel from './components/restaurant/RestaurantPanel'

function App() {
  axios.defaults.baseURL = "http://localhost:3000";
  

  return (
    <>
            <Routes>
              <Route path='/' element={<LandingPage />}></Route> 
              <Route path='/aboutus' element={<AboutUs />}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/signup' element={<Signup/>}></Route>
              <Route path='/forgotpassword' element={<ForgotPassword />}></Route>
              

              <Route path='' element={<PrivateRoutes />}>
                  <Route path='/restaurants' element={<RestaurantList />}>
                    <Route path=':id' element={<RestaurantCard />}></Route>
                    <Route path=':id/addOffer' element={<AddOffer />}></Route>
                  </Route>
                  <Route path='/addOffer' element={<AddOffer />}></Route>
                  <Route path='/addrestaurant' element={<AddRestaurant />}></Route>
                  <Route path='/user/:id' element={<UserProfile/>}></Route>
                  <Route path='/user/editprofile/:id' element={<EditProfile/>}></Route>
                  <Route path='/restaurantOwner/dashbord' element={<RestaurantPanel />}></Route>
              </Route>
            </Routes>
    </>
  )
}

export default App
