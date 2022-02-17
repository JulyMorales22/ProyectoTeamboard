import user from "../models/user.js";
import bcrypt from "bcrypt"; //cifrar
import jwt from "jsonwebtoken"; //token para ingresar y registrarse
import moment from "moment"; //para fechas

const registerUser = async (req, res) => {
  if (!req.body.name || !req.body.password)
    return res.status(400).send({ message: "Incomplete data" });

  const passHash = await bcrypt.hash(req.body.password, 10); //para encriptar la contraseña  - 10 es un numero para jugar y poner los caracteres

  const userSchema = new user({
    name: req.body.name,
    email: req.body.email,
    password: passHash, //aqui esta ya la contraseña encriptada
    role: req.body.role, // el que le habiamos asignado en rolevalidate , despues de haber encontrado
    dbStatus: true,
  });

  const result = await userSchema.save();
  if (!result)
    return res.status(500).send({ message: "failed to register role" });
  try {
    return res.status(200).json({
      //.json para los jsonwebtoken
      token: jwt.sign(
        {
          //sing para que se arme el web token
          _id: result._id,
          name: result.name,
          role: result.role,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(500).send({ message: "Register error" });
  }
};

const listUser = async (req, res) => {
  let users = await user.find().populate("role").exec(); //es una relacion con otra tabla, que me traiga lo que mando en () //find que se traiga la lista de todos - users es un array - exec para que se ejecute
  if (users.length === 0)
    return res.status(400).send({ message: "No search results" });
  return res.status(200).send({ users });
};

export default { registerUser, listUser };
