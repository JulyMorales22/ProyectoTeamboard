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
    return res.status(500).send({ message: "failed to register user" });
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
//RegExp: en esta le estamos diciendo se llega un params name busque con ese si no traiga todo
const listUserAdmin = async (req, res) => {
  let users = await user
    .find({ name: new RegExp(req.params["name"]) })
    .populate("role")
    .exec(); //es una relacion con otra tabla, que me traiga lo que mando en () //find que se traiga la lista de todos - users es un array - exec para que se ejecute
  // if (users.length === 0)
  //   return res.status(400).send({ message: "No search results" });
  // return res.status(200).send({ users });

  return users.length === 0
    ? res.status(400).send({ message: "No search results" })
    : res.status(200).send({ users });
};

const listUser = async (req, res) => {
  let users = await user
    .find({
      $and: [{ name: new RegExp(req.params["name"]) }, { dbStatus: "true" }],
    })
    .populate("role")
    .exec();

  return users.length === 0
    ? res.status(400).send({ message: "No search results" })
    : res.status(200).send({ users });
};

const login = async (req, res) => {
  const userLogin = await user.findOne({ email: req.body.email }); //en userLogin queda guardada todo el json
  if (!userLogin)
    return res.status(400).send({ message: "Wrong email or password " });
  if (!userLogin.dbStatus)
    return res.status(400).send({ message: "Wrong email or password" }); // para verificar si esta activo o no

  const passHash = await bcrypt.compare(req.body.password, userLogin.password); // comparar que lo que viene en el req sea lo mismo que este en userLogin.password que es lo que esta en la base de datos
  if (!passHash)
    return res.status(400).send({ message: "Wrong email or password " });

  try {
    return res.status(200).json({
      //.json para los jsonwebtoken
      token: jwt.sign(
        {
          //sing para que se arme el web token
          _id: userLogin._id,
          name: userLogin.name,
          role: userLogin.role,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(500).send({ message: "Login error" });
  }
};

const deleteUser = async (req, res) => {
  if (!req.params["_id"])
    return res.status(400).send({ message: "Incomplete data" });

  const users = await user.findByIdAndUpdate(req.params["_id"], {
    dbStatus: false, //no lo va a eliminar, solo se actualiza en la db
  });

  return !users
    ? res.status(400).send({ message: "Error deleting user " })
    : res.status(200).send({ message: "Successfully deleted user" });
};

const updateUserAdmin = async (req, res) => {
  if (!req.body._id || !req.body.name || !req.body.role || !req.body.email)
    return res.status(400).send({ message: "Incomplete data" });

    let pass ="";
    if (!req.body.password) {//en caso de que no llegue contraseña para actualizar, o sea se va dejar la misma 
      const findUser = await user.findOne({email: req.body.email});
      pass= findUser.password;
    } else {//en caso de que se haya actualizado
      pass = await bcrypt.hash(req.body.password, 10);
    }

    const editUser = await user.findByIdAndUpdate(req.body._id, {
      name: req.body.name,
      password : pass,
      role: req.body.role
    });

    if(!editUser) return res.status(500).send({ message: "Error editing  user"})
    return res.status(200).send({message: "User updated"});//mejor no mandar editUser porque ese viene con todo el json con la informacion vieja
};

export default {
  registerUser,
  listUser,
  listUserAdmin,
  login,
  deleteUser,
  updateUserAdmin,
};
