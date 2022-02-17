import role from "../models/role.js";

const existingRole = async (req, res, next) =>{
const roleId = await role.findOne({ name: "user"}); //para buscar que exista el rol y poder asignarle 
 if(!roleId) return res.status(500).send({ message: "No role was assigned "}); // esto si no existe

    req.body.role = roleId._id; // despues que verificamos que existe, se lo asignamos al json 
  next()
};

export default { existingRole};