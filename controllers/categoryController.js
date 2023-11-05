import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";


//CREAR CATEGORIA
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Nombre es requerido" });
    }
    const existingCategory = await categoryModel.findOne({nombre: name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Esta categoría existe",
      });
    }
    const category = await new categoryModel({
      nombre: name,
      codigo: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "Nueva categoría creada",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      errro,
      message: "Error al crear categoría",
    });
  }
};

//ACTUALIZAR CATEGORIA
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { nombre: name, codigo: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "Categoria actualizada",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error interno",
    });
  }
};

//TODAS LAS CATEGORÍAS
export const categoryControlller = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "Lista de categorías",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error al listar las categorías",
    });
  }
};

// UNA SOLA CATEGORÍA
export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ codigo: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Categoría individual",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error al traer una categoría",
    });
  }
};

//ELIMINAR CATEGORÍA
export const deleteCategoryCOntroller = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Categoría eliminada",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al eliminar categoría",
      error,
    });
  }
};
