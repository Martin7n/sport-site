import { Router } from "express";
import { isAuth } from "../middlewares/auth-middleware.js";
import { getErrorMessage } from "../utils/errorutils.js";

const router = Router();

router.get("/", async(req, res) => {
    
     
    res.send('BE WORKS')
  });




export default router;  