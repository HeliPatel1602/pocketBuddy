const routes = require("express").Router();
const locationController = require("../controller/locationController");

routes.post("/add",locationController.addLocation);
routes.get("/getall",locationController.getAllLocation);
routes.put("/updatelocation/:id",locationController.updateLocation);
routes.get("/getlocationbycityid/:id",locationController.getLocationByCityId);
routes.get("/getlocationbyid/:id",locationController.getLocationById);
routes.get("/getlocationbyownerid/:id",locationController.getLocationByOwnerId);

module.exports = routes;