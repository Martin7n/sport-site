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

// export const isAuth = (req, res, next) => {
//     if (!req.user){
          
//         console.log("fail")
//         return res.redirect('/login');
//     }
//     next();
// };


export const isAuth = (req, res, next) => {
    console.log(req.cookies.authToken);
    console.log(process.env.AUTH_COOKIE_NAME)
    console.log(req.cookies[process.env.AUTH_COOKIE_NAME]);


    const token = req.cookies[process.env.AUTH_COOKIE_NAME];

    if (!token) {
    console.log('No auth token in cookies');

    return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
    const decoded = jwt.verify(token, process.env.JSON_WEBTOKEN_SECRET);
    console.log(decoded)

    req.user = {
      id: decoded.id,
      email: decoded.email,
      username: decoded.username
    };

    next();
    } catch (err) {
        console.log(err)
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }};
