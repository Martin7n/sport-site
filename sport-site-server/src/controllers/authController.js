import { Router } from "express";
import authservice from "../services/authservice.js";
import jwt from "jsonwebtoken";
import { getErrorMessage } from "../utils/errorutils.js";
import { isAuth } from "../middlewares/auth-middleware.js";

const router = Router();

router.post("/register",  async (req, res) => {

    try {
    const userData = req.body;
    console.log(userData)

    await authservice.register(userData);
    const { token, user } = await authservice.login(userData);

    res.status(201).json({
      token,
      username: user.username,
      email: user.email,
    });
    } catch (err) {
      console.log(err)
      res.status(400).json({
      error: getErrorMessage(err),
    });
  }

});


router.post("/login", async (req, res) => {
    try {
    const userData = req.body;

    const { token, user } = await authservice.login(userData);

    res.status(200).json({
      token,
      username: user.username,
      email: user.email,
    });
    } catch (err) {
    res.status(401).json({
      error: getErrorMessage(err),
    });
    }
});



router.get("/logout", isAuth, (req, res) => {


    res.clearCookie(process.env.AUTH_COOKIE_NAME, {
        httpOnly: true,
        sameSite: 'Lax',
        path: '/',
        secure: true,  
    });
  
    res.status(204).end();
  
});


export default router;