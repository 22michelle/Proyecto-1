import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import User from "../models/User.js";


// Verificaicón del usuario
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      // Se verifica si el email es válido
      const user = await User.findOne({ email: email });

      if (!user) {
        return done(null, false, { message: "El usuario no existe." });
      }

      // Se verifica si la contraseña es válida
      const isMatch = await user.matchPassword(password);
      if (!isMatch)
        return done(null, false, { message: "Contraseña incorrecta." });
      
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});