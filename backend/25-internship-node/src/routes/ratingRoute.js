const routes = require("express").Router();
const ratingController = require("../controller/ratingController");

routes.post("/add",ratingController.addRating);
routes.get("/getall",ratingController.getAllRating);
routes.get("/getratingbylocationidanduserid/:id",ratingController.getRatingByLocationIdAndUserId);
routes.get("/getratingbylocationid/:id",ratingController.getRatingByLocationId);

module.exports = routes;