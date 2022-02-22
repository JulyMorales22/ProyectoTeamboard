import express from "express";
import userController from "../controllers/userController.js";
import userMidd from "../middleware/userValidate.js";
import roleValidate from "../middleware/roleValidate.js";
const router = express.Router(); //express como servidor puede manejar rutas - apis

//http://localhost:3001/api/role/registerRole
router.post(
  "/registerUser",
  userMidd.existingUser,
  roleValidate.existingRole,
  userController.registerUser
); //el "/registerRole" es como debe terminar la ruta de la API

//parametros se incluyen en la ruta, el parametro tal cual se llama en la base de datos, aqui se puede buscar listuser o listuser con filtro
router.get("/listUserAdmin/:name?", userController.listUserAdmin); //el ? es porque es algo que no es obligatorio, lista todos
router.get("/listUser/:name?", userController.listUser); // con filtro solo para los true en dbStatus
router.post("/login", userController.login);
router.put("/deleteUser/:_id", userController.deleteUser); //las url como nosotros las queramos llamar
router.put("/updateUserAdmin", userController.updateUserAdmin);//
export default router;
