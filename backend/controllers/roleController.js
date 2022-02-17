//se va conectar con models de cada uno
import role from "../models/role.js";

//funcion con parametros request y response
//siempre validar que llegue la informacion que se necesita y que llegue en JSON
const registerRole = async (req, res) => {
  if (!req.body.name || !req.body.description)
    //negamos! y ya sabemos que si no hay nada ya se deja asi y por eso el return, no es necesario hacer el if y else
    return res.status(400).send({ message: "Imcomplete data" }); //le mandamos la respuesta de error

  let schema = new role({
    //schema es un objeto con todo lo de role y se usa la misma palabra que usemos en el import
    name: req.body.name, //lo que necesitaba el constructor de role y se pasa lo que viene en el JSON
    description: req.body.description,
    dbStatus:true
  });

  let result = await schema.save(); // enviamos a guardar schema
  if (!result)
    return res.status(500).send({ message: "failed to register role" });

  res.status(200).send({ result });
};

export default { registerRole };
