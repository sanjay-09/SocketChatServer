const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const { connect } = require('./Client/connect');
const conversation=require("./Model/Conversation");
const messagedb=require("./Model/Message");

const app = express();
const server = createServer(app);
const io = new Server(server);
const cors=require("cors");
const users={};
app.use(cors());

io.on("connection", (socket) => {

    socket.on("join",(userId)=>{

      users[userId]=socket.id;
      console.log(`User ${userId} connected with socket ID: ${socket.id}`);
    });
    socket.on("sendMessage",async({ id,message,senderId,receiverId})=>{
    
      await connect();

      if(!senderId ||!receiverId){
        console.log("id not present");
        return;
      }
      let conversationPresent=await conversation.findOne({
        participants:{
          $all:[senderId,receiverId]
          
        }
      })
      if(!conversationPresent){
       conversationPresent= await conversation.create({
          participants:[senderId,receiverId],
          lastMessage:message,
        })
      }
      
    const newMessage=await messagedb.create({
      conversationId:conversationPresent._id,
      senderId,
      message

    })
    const ids=newMessage._id;
  
   
    conversationPresent.lastMessage=message;
    conversationPresent.updatedAt=new Date();
    await conversationPresent.save();

    
      
      receiverId=users[receiverId];
      console.log("---instance",users);
      if(receiverId){
        console.log("receiverrrIddd",receiverId,users[receiverId]);
        //@ts
        io.to(receiverId).emit("receiveMessage",{senderId,message,ids});
        io.to(receiverId).emit("rcu","ok");
      }
    })
  });

app.get("/",(req,res)=>{
    return res.send("ok");

})
server.listen(3001, async() => {
  console.log('server running at http://localhost:3001');
  await connect();
  console.log("database connected");

});