import cdt from "../models/cdt.js";

export const rendercdtForm = (req, res) => res.render("cdts/new-cdt");

// Crear nuevo cdt
export const createNewcdt = async (req, res) => {
  const { title, description } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Por favor escribe un titulo." });
  }
  if (!description) {
    errors.push({ text: "Por favor escribe una descripción" });
  }
  if (errors.length > 0)
    return res.render("cdt/new-cdt", {
      errors,
      title,
      description,
    });

  const newcdt = new cdt({ title, description });
  newcdt.user = req.user.id;
  await newcdt.save();
  req.flash("success_msg", "CDT creado satisfactoriamente");
  res.redirect("/cdt");
};

// Renderizamos el cdt
export const rendercdt = async (req, res) => {
  const cdts = await cdt
    .find({ user: req.user.id })
    .sort({ date: "desc" })
    .lean();
  res.render("cdt/all-cdt", { cdts });
};

// Editar como admin
export const renderEditForm = async (req, res) => {
  const cdt = await cdt.findById(req.params.id).lean();
  if (cdt.user != req.user.id) {
    req.flash("error_msg", "No estas autorizado");
    return res.redirect("/cdts");
  }
  res.render("cdts/edit-cdt", { cdt });
};

// Actualizar cdt
export const updatecdt = async (req, res) => {
  const { title, description } = req.body;
  await cdt.findByIdAndUpdate(req.params.id, { title, description });
  req.flash("success_msg", "CDT actualizado satisfactoriamente");
  res.redirect("/cdts");
};

// Eliminar cdt
export const deletecdt = async (req, res) => {
  await cdt.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "cdt eliminado satisfactoriamente");
  res.redirect("/cdts");
};
