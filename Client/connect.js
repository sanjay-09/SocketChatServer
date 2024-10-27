const mongoose=require("mongoose");
const connect=async()=>{

     await mongoose.connect("mongodb+srv://sanjuwatson0110:fodfEnhrWtV0Nl9r@cluster1.chpu5ky.mongodb.net/flatMate")

}
module.exports={
    connect
}