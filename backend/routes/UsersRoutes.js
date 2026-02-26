const express = require('express')
const router = express.Router()

const { getUsers, registerUser, updateUser, deleteUser, loginUser } = require('../models/UsersModel')
const {generateToken} = require('../controller/authController')
const {verifyToken, isAdmin} = require('../middleware/authMiddleware')

router.get('/',verifyToken, async(req,res)=>{
    try {
        const users = await getUsers()
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
})
router.post('/login',async(req,res)=>{
    try {
        const {email, password} = req.body
        const user = await loginUser(email, password)
        
        if(!user)   
            return res.status(401).json({ message: "No user found"} )

        const token = generateToken(user)

        res.status(200).json({ message: "Login Successfull", user, token})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
})

router.post('/signup',async(req,res)=>{
    try {
        const {name, email, password} = req.body
        console.log("Received signup request:", {name, email, password});
        const user = await registerUser(name, email, password)
        console.log("2 log");
        
        const token = generateToken(user)
        res.status(201).json({token, user})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
})
router.put('/:id',verifyToken , isAdmin,async(req,res)=>{
    try {
        const { name, email, passwordHash, role, phoneNumber} = req.body
        const { id } = req.params
        const users = await updateUser(name, email, passwordHash, role, phoneNumber, id)
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
})
router.delete('/:id',verifyToken, isAdmin, async(req,res)=>{
    try {
        const { id } = req.params
        const users = await deleteUser(id)
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
})
module.exports = router;