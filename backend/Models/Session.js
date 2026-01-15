const mongoose = require("mongoose");
const { useRef } = require("react");
const sessionSchema= new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    role:{type:String, required:true},
    experience:{type:String, required:true},
    topicToFocus:{type:String, required:true},
    description:String,
    questions:[{type: mongoose.Schema.Types.ObjectId,ref:"Question"}],

    
},{timestamp:true});

module.exports= mongoose.model("session",sessionSchema);