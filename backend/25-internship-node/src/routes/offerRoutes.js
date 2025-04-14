const offerController = require("../controller/offerController");
const routes = require("express").Router();

routes.post("/add",offerController.addOffer);
routes.get("/getall",offerController.getAllOffers);
routes.get("/getofferbylocationid/:id",offerController.getOfferByLocationId);
routes.delete("/deleteoffer/:id",offerController.deleteOfferById);

module.exports = routes;