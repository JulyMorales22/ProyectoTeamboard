import express from "express";
import roleController from "../controllers/roleController.js";
const router = express.Router(); //express como servidor puede manejar rutas - apis 

//http://localhost:3001/api/role/registerRole
router.post("/registerRole", roleController.registerRole)//el "/registerRole" es como debe terminar la ruta de la API

router.get("/listRole", roleController.listRole)

export default router;