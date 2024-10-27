const mongoose=require("mongoose");
const conversationSchema=new mongoose.Schema({
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        }
    ],
    lastMessage:{
        type:String
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
})
const conversation=mongoose.models.Conversation || mongoose.model("Conversation",conversationSchema);
module.exports=conversation;

