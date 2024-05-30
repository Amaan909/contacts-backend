const express=require("express")
const router=express.Router()
const {getContacts,createContact,getContact, updateContact, deleteContact}=require("../controllers/contactControllers")
const validatetoken = require("../middleware/validateTokenHandler")
router.use=validatetoken//all routes get protected
router.route("/").get(getContacts).post(createContact)
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact)//common routes

module.exports=router