const cityController = require("../controller/cityController");

const routes = require("express").Router();

routes.post("/add",cityController.addCity);
routes.get("/getall",cityController.getAllCity);
routes.get("/getcitybystate/:stateId",cityController.getCityByStateId);
routes.get("/getcityidbyname/:cityName",cityController.getCityIdByName);

module.exports = routes;