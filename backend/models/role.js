import mongoose from "mongoose";

//nuevo esquema de base de datos de mongoose  - {} porque es json
const roleSchema = new mongoose.Schema({
  name: String,
  description: String,
  registerDate: { type: Date, default: Date.now }, //para que la fecha de registro del usuario quede automaticamente del sistema -fechas y id llevan las {}
  dbStatus: Boolean, //es mejor no borrar registros o colecciones de la DB mas bien desactivarla y asi puede quedar el historial
});

const role = mongoose.model("roles", roleSchema); // coleccion roles y que guarde lo que esta en roleSchema 
export default role; //role es para usarlo en js 