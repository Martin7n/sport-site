
import { Schema, model, Types } from "mongoose";
import { minMaxLenValidator, minMaxValidatorObj } from "../utils/validators.js";



const complexSchema = new Schema({

        type:          { type: String, required: true, validate: minMaxLenValidator(2) },
        equipment:     { type: String, required: true, validate: minMaxLenValidator(3) },
        exercises:     [{ type:Types.ObjectId, ref: "Exercise"}],
        // image:          { type: String, required: true, 
        //                 validate: {
        //                 validator: 
        //                 val => /^https?:\/\//.test(val),
        //                 message: (props) => `${props.value} is invalid image url!`
        //              a   }
        // },
        likes:          [{ type:Types.ObjectId, ref: "User"}],
        // owner:          { type: Types.ObjectId, ref: "User", required: true }
    
    },
          {
            timestamps: true
          }
    );

const Complex = model("Complex", complexSchema);

export default Complex;
    

