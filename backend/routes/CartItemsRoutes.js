const express = require('express')
const router = express.Router()

const {getCart, updateItem, deleteItem} = require('../models/CartItemsModel')
const {verifyToken, isAdmin} = require('../middleware/authMiddleware')

router.get('/', async(req, res)=>{
    try {
        const userId = req.user.id
        const cart = await getCart(userId)

        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})

router.put('/:id', async(req, res)=>{
    try {
        const {quantity} = req.body
        const { id } = req.params
        const cart = await updateItem(quantity, id)
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})
router.delete('/:id', async(req, res)=>{
    try {
        const { id } = req.params
        const cart = await deleteItem(id)
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})
module.exports = router;
