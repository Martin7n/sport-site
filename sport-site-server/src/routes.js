import { Router } from "express";
import homeController from "../src/controllers/homeController.js"
import authControler from "../src/controllers/authController.js"
import complexController from "../src/controllers/complexControler.js"
import workoutController from "../src/controllers/workoutController.js"

import { apiKeyMware } from "./middlewares/api-auth.js";
import { authMiddleware } from "./middlewares/auth-middleware.js";
const routes = Router();

routes.use(authMiddleware);
routes.use(homeController);
// routes.use(apiKeyMware);
routes.use("/", homeController);
routes.use("/auth", authControler);
routes.use("/wo", complexController); 
routes.use("/userworkout", workoutController);



// );
routes.all('*url', (req, res) => {
    res.send('404')
});

console.log("test1")

export default routes;