const mongoose=require("mongoose");
const messageSchema=new mongoose.Schema({
    conversationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Conversation"
    },
    senderId:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    read:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})
const messagedb=mongoose.models.Message || mongoose.model("Message",messageSchema);
module.exports=messagedb;