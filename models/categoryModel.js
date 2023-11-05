import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  codigo: {
    type: String,
    lowercase: true,
  },
});

export default mongoose.model("Categoria", categorySchema);
