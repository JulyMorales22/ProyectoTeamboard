import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: mongoose.Schema.ObjectId, ref: "roles" }, //pasarle el id de roles dependiendo el rol que vaya a tener
  registerDate: { type: Date, default: Date.now },
  dbStatus: Boolean,
});

const user = mongoose.model("users", userSchema);
export default user;
