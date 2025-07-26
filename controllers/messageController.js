import User from "../model/User";
import Message from "../model/Message";
import cloudinary from "../lib/cloudinary";
import {io, userSocketMap} from "../lib/socket.js";



// Get all the  uset to expert the logged  in user

import Message from "../model/Message";


export const getUsersForSidebar = async (req, res) => {
    try{
        const userId = req.user._id;
        const filteredUser = await User.find({_id: {$ne: userId}}).select("-password ");

        //Count the number of unread messages for each user
        const unreadMessages = {}
        const promises = filteredUser.map(async (user)=>{
            const messsages = await Message.find({
                senderId: user._id,
                receiverId: userId,
                seen: false
            })
            if(messsages.length > 0) {
                unreadMessages[user._id] = messsages.length;
            }
            


        })
        await Promise.all(promises);
        res.json({success: true, users: filteredUser, unreadMessages});

    }
    catch(error) {
        console.log(error.message);
        res.json({success: false, message: error.message});

    }
}

// Get all the  messagases all the users
export const getAllMessages = async (req, res) => {
    try{
        const {id :  selectedUserId } = req.params;
        const myId =req.user._id;

        const messages = await Message.find({
            $or:[
                {senderID: myId, receiverID: selectedUserId},
                {senderID: selectedUserId, receiverID: myId},

            ]
        })
        await Message.updateMany({senderId: selectedUserId, receiverID: myId, seen: true});
        res.json({success: true, messages});

    }catch(error) {
        console.log(error.message);
        res.json({success: false, message: error.message});


    }


}

// Api to mark messsages as seen as using the message id
export const markMessagesAsSeen = async (req, res) => {
    try{

        const {id} = req.params;
        await Message.findByIdAndUpdate(id, {seen: true} )
        res.json({success: true})

    }catch(error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}


// send message to slected user
export const sendMessage = async (req, res) => {
    try{

    const {text, image} = req.body;
    const receiverID = req.params.id;
    const senderID = req.user._id;

    let imageUrl;
    if(image){
        const uploadResponse = await cloudinary.uploader.upload(image)
        imageUrl = uploadResponse.secure_url;
    
    }
    const newMessage = await Message.create({
        senderID,
        receiverID,
        text,
        image: imageUrl
    })
    
    // Emit the message to the receiver's socket
    const receiverSocketId = userSocketMap[receiverID]
    if(receiverSocketId) {
        io.to(receiverSocketId).emit("getMessage", newMessage);
    }

    res.json({success: true, message: newMessage});
    
    }catch(error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}