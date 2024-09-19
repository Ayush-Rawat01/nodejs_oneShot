const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");


const registerUser = asyncHandler(async (req, res) => {

    const {username,email,password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error('Please fill in all fields');
    }
    
    const existingUser = await User.findOne({email});
    if(existingUser){
        res.status(400);
        throw new Error("user already exists");
    }
     
    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = await User.create({
         username,
         email,
         password:hashedPassword
    });

     console.log(`user created : ${newUser}`);

    res.json({ message: "Register the user" });
});

const loginUser = asyncHandler(async (req, res) => {
    res.json({ message: "Login the user" });
});

const currentUser = asyncHandler(async (req, res) => {
    res.json({ message: "current user info" });
});

module.exports = { registerUser, loginUser, currentUser };