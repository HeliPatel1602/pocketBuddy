const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())//to accept data in json

//import role routes
const roleRoutes = require("./src/routes/roleRoutes")
app.use(roleRoutes)

//user routes
const userRoutes = require("./src/routes/userRoutes")
app.use(userRoutes)

//state routes
const stateRoutes = require("./src/routes/stateRoutes")
app.use("/state",stateRoutes)

//city routes
const cityRoutes = require("./src/routes/cityRoutes")
app.use("/city",cityRoutes)

//area routes
const areaRoutes = require("./src/routes/areaRoutes")
app.use("/area",areaRoutes)

//location routes
const locationRoutes = require("./src/routes/locationRoutes")
app.use("/location",locationRoutes)

//offer routes
const offerRoutes = require("./src/routes/offerRoutes")
app.use("/offer",offerRoutes)

//rating routes
const ratingRoutes = require("./src/routes/ratingRoute");
app.use("/rating",ratingRoutes)


mongoose.connect("mongodb://127.0.0.1:27017/25_node_internship").then(()=>{
    console.log("database connected....")
})


const PORT = 3000
app.listen(PORT,()=>{
    console.log("server started on port number ",PORT)
})