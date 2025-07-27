
import { Schema, model, Types } from "mongoose";
import bcrypt from "bcrypt";
import { minMaxLenValidator } from "../utils/validators.js";

const userSchema = new Schema({
    firstName: { type: String, validate: minMaxLenValidator(3),trim: true, },
    lastName:  { type: String, validate: minMaxLenValidator(3),trim: true, },
    username: { type: String, validate: minMaxLenValidator(2, 20),trim: true, },
    email:{ type: String, validate: minMaxLenValidator(10),
            lowercase: true, match: /\@[a-zA-Z]+.[a-zA-Z]+$/, },
    password: {type: String, validate: minMaxLenValidator(4), trim: true,}
},
    {
    timestamps: true
    });


userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 10)
    
});

// userSchema.virtual('username').get(function () {
//   if (this.firstname && this.lastname) {
//     return `${this.firstname.toLowerCase()}.${this.lastname.toLowerCase()}`;
//   }
//   return '';
// });
// userSchema.set('toJSON', { virtuals: true });
// userSchema.set('toObject', { virtuals: true });


const User = model("User", userSchema);



export default User;


// firstName – string (required)
// lastName – string (required)
// email – string (required)
// password – string (required)
// The first name is required and should be at least 3 characters long.
// The last name is required and should be at least 3 characters long.
// The email is required and should be at least 10 characters long.
// The password is required and should be at least 4 characters long.
// The repeat password is required and should be equal to the password.