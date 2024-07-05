import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "please provide username"]
    },
    email: {
        type: String,
        required: [true, "please provide email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "please provide password"],
        unique: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: String,
    VerifyToken: String,
    VerifyTokenExpiry: Date,



}, { timestamps: true })

const userModel= mongoose.models.users || mongoose.model("users",userSchema)

export default userModel