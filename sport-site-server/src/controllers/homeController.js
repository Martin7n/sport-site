import { Router } from "express";
import { isAuth } from "../middlewares/auth-middleware.js";
import { getErrorMessage } from "../utils/errorutils.js";

const router = Router();

router.get("/", async(req, res) => {
    
     
    res.send('home')
  
    // // res.render("home", {layout: false})
});




export default router;  