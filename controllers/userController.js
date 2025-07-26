import { generateToken } from '../lib/utils.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt.js';
import cloudinary from '../lib/cloudinary.js';


// sign up user account
export const signUp = async (req, res) => {
    const { email, fullName, password, profilePic, bio } = req.body;

    // Validate input
    if (!email || !fullName || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if user already exists
        if(!email || !fullName || !password ||!bio) {
            return res.json({success: false, message: "Missing Details"});
        }
        const existingUser = await User.findOne({ email});
        if(user){
            return res.json({success: false, message: "Account already exists with this email"})

        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            email,
            fullName,
            password: hashedPassword,
            bio,
    });

    const token = generateToken(newUser._id);
    res.json({success: true, userData:newUser, token, message: "Account created successfully"})
    }catch (error) {
        console.error("Error during sign up:", error);
            res.json({success: false,  message: error.message})



    }

    
}
//controller to login user account
export const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const userData = await User.findOne({email})

        const isPasswordValid = await bcrypt.compare(password, userData.password);
        if(!isPasswordValid) {
            return res.json({success: false, message: "Invalid email or password"});
         
        }

        const token = generateToken(userData._id);
        res.json({success: true, userData, token, message: "Login successful"});

    }
    catch (error) {
        console.error("Error during login:", error);
        res.json({success: false, message: error.message});
        
    }
}

//Controller to cheack the user authentication
export const checkAuth = (req, res) => {
    res.json({success: true, user: req.user});
    } 

//Controller to update user profile
export const updateProfile = async (req, res) => {
    

    try {
        const { fullName, bio, profilePic } = req.body;

    const userId = req.user._id;
    let updatedUser ;

    if (!profilePic) {
        updatedUser =  await User.findByIdAndUpdate(userId, {fullName,bio}, { new: true });
    }
    else {
        const upload = await cloudinary.uploader.upload(profilePic);
        
        updatedUser = await User.findByIdAndUpdate(userId, {profilePic: upload.secure_url, fullName, bio}, { new: true });
    }

    res.json({ success : true, user: updatedData})
    
 } catch (error) {
        console.error("Error updating profile:", error);
        res.json({ success: false, message: error.message });
    }
}