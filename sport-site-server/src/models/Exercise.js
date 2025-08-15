
import { Schema, model, Types } from "mongoose";
import { minMaxLenValidator, minMaxValidatorObj } from "../utils/validators.js";



const exerciseSchema = new Schema({

        type:           { type: String, required: true, validate: minMaxLenValidator(2) },
        category:       { type: String, required: true, validate: minMaxLenValidator(3) },
        name:           { type: String, required: true, validate: minMaxLenValidator(2) },
        subcategory:    {type: String,required: true, validate: minMaxLenValidator(2)},
        // likes:          [{ type:Types.ObjectId, ref: "User"}],
        // owner:          { type: Types.ObjectId, ref: "User", required: false }
    
    },
          {
            timestamps: true
          }
    );

const Exercise = model("Exercise", exerciseSchema);

export default Exercise;
    

