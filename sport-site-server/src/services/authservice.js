import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


export default {



    async register(userData){

        if (userData.password !== userData.repass)
            { throw new Error("Password and re-password are not the same.")}
   

        const email = await User.findOne({email: userData.email}, "email");
        if (email) {
            console.log(email)
            throw new Error('Email already exists');
        }

        return User.create(userData)

    },

    async login(userData){
        const user = await User.findOne({email: userData.email});
        if (!user) {
            throw new Error('Invalid email or password!');
        }

        const isValid = await bcrypt.compare(userData.password, user.password);
        if (!isValid) {
            throw new Error('Invalid email or password!');
        }

        const payload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        };  
        
        const token = jwt.sign(payload, process.env.JSON_WEBTOKEN_SECRET, { expiresIn: '2h' });
        
        return token

    },

};