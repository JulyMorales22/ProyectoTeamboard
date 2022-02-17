// conexion con mongodb  - node
import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true, //utilizar una nueva url, para darle un formato diferente y que no salga la de DB_CO...
      useUnifiedTopology: true, //para el tipo de escritura, para que sea mas facil de entender lo que sale en consola
    });
    console.log("Connection with MongoDB: OK");
  } catch (e) {
    console.log("Error connecting to MongoDB: \n ", e);
  }
};

export default { dbConnection }; //Siempre se debe hacer para poder usar en otros modulos
