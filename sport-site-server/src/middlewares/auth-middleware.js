import jwt from 'jsonwebtoken';
import { getErrorMessage } from '../utils/errorutils.js';




export const authMiddleware = (req, res, next) => {
    
    const token = req.cookies[process.env.AUTH_COOKIE_NAME];
    if (!token){
        return next()
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JSON_WEBTOKEN_SECRET);
        req.user = decodedToken;
        req.isAuthenticated = true;
        res.locals.user = decodedToken;
        res.locals.isAuthenticated = true;
        next()
    } catch (err) {
        // console.log(err)
        res.clearCookie(process.env.AUTH_COOKIE_NAME);
        res.redirect('/login');
    }
   
}

export const isAuth = (req, res, next) => {
    if (!req.user){
          
        return res.redirect('/login');
    }
    next();
};

