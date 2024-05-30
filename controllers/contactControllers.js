//get description
const asyncHandler=require("express-async-handler")
const Contact=require("../models/contactmodels")
const getContacts = asyncHandler(async(req,res)=>{
    const contacts=await Contact.find({user_id:req.user.id})
    res.status(200).json(contacts)
})
const createContact = asyncHandler(async(req,res)=>{
    console.log("Request body is ",req.body);
    const {name,age,email}=req.body;
    if(!name||!age||!email){
        res.status(400)
        throw new Error("All fields are mandatory!")
    }     
    const contacts=await Contact.create({
        name,
        age,
        email,
        user_id:req.user.id
    })
    res.status(201).json(contacts)
})
const getContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }
    res.status(200).json(contact)
})
const updateContact=asyncHandler(async(req,res)=>{
    const updatedcontact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(200).json(updatedcontact)
})
const deleteContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }
    await Contact.remove()
    res.status(200).json(Contact)
})

module.exports={getContacts,createContact,getContact,updateContact,deleteContact}