//validaciones para el usuario
import user from "../models/user.js";


//next si todo esta bien que continue
const existingUser = async (req, res, next) =>{ 
    if (!req.body.email )
       return res.status(400).send({ message: "Incomplete data" });
    
        //primero validar que el usuario ya no este registrado
        //findOne funcion para buscar el primer registro que encuentre - user es el que se importo que esta cumpliendo el papel de la coleccion del modelo
  //await para que esperecomo tiene que ir hasta la DB
    const existingEmail = await user.findOne({ email: req.body.email });
    if (existingEmail)
       return res.status(400).send({ message: "The user is already registered" });
    next();

};

export default { existingUser };