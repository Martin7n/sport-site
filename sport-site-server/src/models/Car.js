
import { Schema, model, Types } from "mongoose";
import { minMaxLenValidator, minMaxValidatorObj } from "../utils/validators.js";



const carSchema = new Schema({

        model:          { type: String, required: true, validate: minMaxLenValidator(2) },
        manufacturer:   { type: String, required: true, validate: minMaxLenValidator(3) },
        engine:         { type: String, required: true, validate: minMaxLenValidator(3)},
        description:    { type: String, required: true, validate: minMaxLenValidator(5, 500) },
        topSpeed:          { type: Number, required: true, min: [10, "Must be 2 digit number"] },
        image:          { type: String, required: true, 
                        validate: {
                        validator: 
                        val => /^https?:\/\//.test(val),
                        message: (props) => `${props.value} is invalid image url!`
                        }
        },
        likes:          [{ type:Types.ObjectId, ref: "User"}],
        owner:          { type: Types.ObjectId, ref: "User", required: true }
    
    },
          {
            timestamps: true
          }
    );

const Car = model("Car", carSchema);

export default Car;
    

