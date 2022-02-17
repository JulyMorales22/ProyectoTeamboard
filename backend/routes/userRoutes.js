import express from "express";
import userController from "../controllers/userController.js";
import userMidd from "../middleware/userValidate.js";
import roleValidate from "../middleware/roleValidate.js";
const router = express.Router(); //express como servidor puede manejar rutas - apis 

//http://localhost:3001/api/role/registerRole
router.post("/registerUser", userMidd.existingUser, roleValidate.existingRole, userController.registerUser)//el "/registerRole" es como debe terminar la ruta de la API

router.get("/listUser", userController.listUser)
export default router;