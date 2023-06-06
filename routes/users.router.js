const express = require("express")
const router = express.Router()

const apiAuthMiddleware = require("../auth/apiAuthMiddleware");
const usersController = require("../controller/users.controller");

// Apply the API key authentication middleware to the routes that require authentication
router.use(apiAuthMiddleware);

// Define your protected routes
router.get("/getdata/", usersController.getAll)
router.get("/getbyid/:uu_id",usersController.getById)
router.post("/createuser/",usersController.create)
router.put("/updateUser/",usersController.update)
router.delete("/del/:uu_id/",usersController.delete)
router.post("/fileupload/",usersController.uploadfile)
router.put("/assigncode/",usersController.assigncode)

module.exports = router;