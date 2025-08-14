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

     res.cookie('authToken', token, {
      httpOnly: true,
      secure: false,         
      sameSite: 'Lax',
      maxAge: 1000 * 60 * 60 * 4, // 4 hours
      path: '/',
    });

    res.status(200).json({
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

     res.cookie('authToken', token, {
      httpOnly: true,
      secure: false,         
      sameSite: 'Lax',
      maxAge: 1000 * 60 * 60 * 4, // 4 hours
      path: '/',
    });

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


router.get("/logout",  (req, res) => {


    res.clearCookie(process.env.AUTH_COOKIE_NAME, {
        httpOnly: false,
        // sameSite: 'Lax',
        // sameSite: 'Lax',
        path: '/',
        secure: true,  
    });

    // console.log("CLEARED")
  
    res.status(204).end();
  
});


router.get('/check',  (req, res) => {
 
  console.log("CheckOut")
  res.status(200).json({
    valid: true,
    // userId: req.user.id,
    username: req.user.username,
    email: req.user.email,
  });
});



export default router;