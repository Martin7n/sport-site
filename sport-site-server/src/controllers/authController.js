import { Router } from "express";
import authservice from "../services/authservice.js";
import jwt from "jsonwebtoken";
import { getErrorMessage } from "../utils/errorutils.js";
import { isAuth } from "../middlewares/auth-middleware.js";

const router = Router();

router.get("/register",  (req, res) => {

    const userId = req.user?.id
    if (userId){
        return res.redirect("/")
    }
    const title = {title: "register"}

    res.render('auth/register', title)

});


router.post("/register", async (req, res) => {
    const userId = req.user?.id
    if (userId){
        return res.redirect("/")
    }
    const userData = req.body;
    const title = {title: "register"}

    try{
        await authservice.register(userData);
        const token = await authservice.login(userData);
        res.cookie(process.env.AUTH_COOKIE_NAME, token, { httpOnly: true });

        res.redirect("/")

    } catch (err) {
        const error = getErrorMessage(err);        
        return res.render('auth/register',  {error, user: userData, title} );

    };



});


router.get("/login", async (req, res) => {
    const userId = req.user?.id
    if (userId){
        return res.redirect("/")
    }
        res.render('auth/login')
});

router.post("/login", async (req, res) => {
    const userId = req.user?.id
    if (userId){
        return res.redirect("/")
    }
    const userData = req.body;

    try{
        const token = await authservice.login(userData);        
        res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });
        return res.redirect('/');

    } catch (err) {
        return res.render('auth/login', { error: getErrorMessage(err), user: userData });
    };
});


router.get("/logout", isAuth, (req, res) => {
    if (req.user)
    {   
        res.clearCookie(AUTH_COOKIE_NAME);
       
    }
     res.redirect('/')
});


export default router;