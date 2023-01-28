import app from "../src/app.js";
import { createAdminUser } from "./libs/createUser.js";
import "../src/db.js";

async function main() {
  await createAdminUser();
  app.listen(app.get("port"));

  console.log("Server corriendo por el puerto", app.get("port"));
  console.log("Environment:", process.env.NODE_ENV);
}

main();
