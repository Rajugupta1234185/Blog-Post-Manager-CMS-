import user from '../models/user.js';


export const authlogin= async(req,res)=>{
    try{
        const{userName, password}=req.body;

        const User= await user.findOne({userName,password});

        if(User){
            res.status(200).json({message:"Login credentials verified"});
        }
        else{
            res.status(404).json({message:"No user found with this credentials"});
        }

    }
    catch(error){
        res.status(500).json({message:"Internal server error"});
    }
}

export const registeruser= async(req,res)=>{
    try{
        const{userName,password}=req.body;

        const newuser= new user({userName,password});
        newuser.save();
        res.status(200).json({message:"new user registered successfully"});
    }
    catch(error){
        res.status(500).json({message:"Internal server error occurred"});
    }
}
