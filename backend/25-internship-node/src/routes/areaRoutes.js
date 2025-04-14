const routes = require("express").Router();
const areaController = require("../controller/areaController");

routes.post("/add",areaController.addArea);
routes.get("/getall",areaController.getAllAreas);
routes.get("/getareabycity/:cityId",areaController.getAreaByCityId);

module.exports = routes;