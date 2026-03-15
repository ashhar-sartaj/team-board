//creating a user model for our db
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    //should have name, email password
    name : {
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    
},
    {
        timestamps: true
    }
)
const User = mongoose.model('User', userSchema);
export default User;
