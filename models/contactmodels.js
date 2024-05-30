const mongoose=require("mongoose")
//contact database
const contactschema=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },

    name:{
        type:String,
        required:[true,"please add the contact name"]
    },
    age:{
        type:String,
        required:[true,"please add the contact age"]
    },
    email:{
        type:String,
        required:[true,"please add the contact email"]
    }
},
{
    timestamps:true
})

module.exports=mongoose.model("Contact",contactschema)