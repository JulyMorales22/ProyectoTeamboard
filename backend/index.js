import express from "express";
import cors from "cors"; // necesita unas reglas de seguridad porque va consumir API,etc -- cors
import db from "./db/db.js";
import roleRoutes from "./routes/roleRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express(); //app sera nuestro server    
app.use(express.json()); //usaremos el json
app.use(cors()); //permite compartir recursos
app.use("/api/role", roleRoutes)//"/api/role" seria la otra parte de la ruta
app.use("/api/user", userRoutes)
app.use("/api/task", taskRoutes)
//para decirle al sistema operativo que aqui va trabajar
app.listen(process.env.PORT, () =>
  console.log("Backend server running on port: ", process.env.PORT)
);

db.dbConnection();
