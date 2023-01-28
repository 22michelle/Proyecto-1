import User from "../models/User.js";
import passport from "passport";

export const renderSignUpForm = (req, res) => res.render("auth/signup");

// Registro
export const signup = async (req, res) => {
  let errors = [];
  const { name, email, password, confirm_password } = req.body;
  if (password !== confirm_password) {
    errors.push({ text: "Las contraseñas no coinciden." });
  }

  if (password.length < 4) {
    errors.push({ text: "Las contraseñas deben tener al menos 4 caracteres." });
  }

  if (errors.length > 0) {
    return res.render("auth/signup", {
      errors,
      name,
      email,
      password,
      confirm_password,
    });
  }

  // Verificar si el correo ya esta en uso
  const userFound = await User.findOne({ email: email });
  if (userFound) {
    req.flash("error_msg", "El email ya esta en uso.");
    return res.redirect("/auth/signup");
  }

  // Guardar nuevo usuario
  const newUser = new User({ name, email, password });
  newUser.password = await newUser.encryptPassword(password);
  await newUser.save();
  req.flash("success_msg", "Estas registrado.");
  res.redirect("/auth/signin");
};

export const renderSigninForm = (req, res) => res.render("auth/signin");

export const signin = passport.authenticate("local", {
  successRedirect: "/cdt",
  failureRedirect: "/auth/signin",
  failureFlash: true,
});

export const logout = async (req, res, next) => {
  await req.logout((err) => {
    if (err) return next(err);
    req.flash("success_msg", "Cerraste sesión.");
    res.redirect("/auth/signin");
  });
};
// Iniciar sesión
export const rendersignin = (req, res) => {
  res.render("auth/signin");
};
