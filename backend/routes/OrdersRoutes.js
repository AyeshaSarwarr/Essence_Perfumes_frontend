const express = require('express')
const router = express.Router()

const {getOrders, createFullOrder, updateOrder, deleteOrder, getOrderById} = require('../models/OrdersModel')
const {verifyToken, isAdmin} = require('../middleware/authMiddleware')

router.get('/',verifyToken,isAdmin, async(req, res)=>{
    try {
        const orders = await getOrders()
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})

router.get('/my-history',verifyToken, async(req, res)=>{
    try {
        const order = await getOrderById(req.user.id)
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})
router.post('/', async(req, res)=>{
    try {
        const {orderData, items} = req.body

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const orderId = await createFullOrder(orderData, items)
        res.status(201).json({orderId})
    } catch (error) {
        const status = error.message.includes('stock') ? 400 : 500;
        res.status(status).json({ message: error.message });
    }
})
router.put('/:id',verifyToken, isAdmin, async(req, res)=>{
    try {
        const {totalPrice, status, shippingAddress, guestEmail, guestPhoneNumber, guestName} = req.body
        const { id } = req.params
        const orders = await updateOrder(totalPrice, status, shippingAddress, guestEmail, guestPhoneNumber, guestName, id)
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})
router.delete('/:id',verifyToken,isAdmin, async(req, res)=>{
    try {
        const { id } = req.params
        const orders = await deleteOrder(id)
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})
module.exports = router;
/*
router.get('/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const order = await getOrderById(id);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
*/