import User from "../models/User.js";

// Generando rol admin como usuario de la app
export const createAdminUser = async () => {
  const userFound = await User.findOne({ email: "admin@gmmail.com" });
  if (userFound) return;
  const newUser = new User({
    username: "admin",
    email: "admin@gmmail.com",
    password: "admin123",
  });
  newUser.password = await newUser.encryptPassword("adminpassword");
  const admin = await newUser.save();
  console.log("Admin creado", admin);
};
