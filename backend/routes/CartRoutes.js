const express = require('express')
const router = express.Router()

const {addItemToCart, deleteCart} = require('../models/CartModel')
const {verifyToken, isAdmin} = require('../middleware/authMiddleware')

router.post('/',verifyToken, async(req, res)=>{
    try {
        const {items} = req.body
        const user_id = req.user.id

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const cartId = await addItemToCart(user_id, items)
        res.status(201).json({cartId})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.delete('/:id',verifyToken,isAdmin, async(req, res)=>{
    try {
        const { id } = req.params
        const cart = await deleteCart(id)
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})
module.exports = router;
