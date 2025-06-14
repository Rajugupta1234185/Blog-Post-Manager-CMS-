import mongoose from 'mongoose';

const users=new mongoose.Schema({

    userName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        require:true,
    }

})

const user=mongoose.model("user",users);
export default user;