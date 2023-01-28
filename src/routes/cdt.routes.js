import { Router } from "express";
import {
  rendercdtForm,
  createNewcdt,
  rendercdt,
  renderEditForm,
  updatecdt,
  deletecdt,
} from "../controllers/cdt.controller.js";
import { isAuthenticated } from "../helpers/auth.js";

const router = Router();

// RUTAS del login y register
// Nuevo cdt 
router.get("/cdt/add", isAuthenticated, rendercdtForm);
router.post("/cdts/new-cdt", isAuthenticated, createNewcdt);

// Obtener todos los cdts
router.get("/cdts", isAuthenticated, rendercdt);

// Editar/actualizar cdt
router.get("/cdts/edit/:id", isAuthenticated, renderEditForm);
router.put("/cdts/edit-cdt/:id", isAuthenticated, updatecdt);

// Eliminar cdt
router.delete("/cdts/delete/:id", isAuthenticated, deletecdt);

export default router;
