const routes = require("express").Router()
const userController = require("../controller/userController")

// routes.post("/user",userController.addUser)

routes.post("/user",userController.signup)
routes.post("/user/login",userController.loginUser)
routes.get("/user/all",userController.getAllUsers)
routes.get("/user/:id",userController.getUserById)
routes.delete("/user/:id",userController.deleteUserById)
routes.post("/user/addwithfile",userController.addUserWithFile)
routes.put("/user/updateuser/:id",userController.updateUser);
routes.put("/user/updaterole/:id",userController.updateRole);

module.exports = routes