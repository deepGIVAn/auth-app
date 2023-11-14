import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req,res)=>{
    const { username, email, password } = req.body;
    // if i just uses hash here so i need to define the await in front of the code line..
    const hashedPassword = bcryptjs.hashSync(password, 10);
    // due to es6, {name:name} ===> {name}
    const newUser = new User({ username, email, password:hashedPassword });
    try {
        await newUser.save();
        res.status(201).json({message:"User created successfully"});        
    } catch (error) {
        res.status(500).json(error.message);
    }
}