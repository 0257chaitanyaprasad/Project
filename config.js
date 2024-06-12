const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/users')
.then(()=>{
    console.log("Connection successfull.");
})
.catch(()=>{
    console.log("Failed to connect");
});


const LoginSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;