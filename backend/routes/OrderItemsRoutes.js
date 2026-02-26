const express = require('express')
const router = express.Router()

const {getOrderItems, deleteOrderItem} = require("../models/OrderItemsModel")
const {verifyToken, isAdmin} = require('../middleware/authMiddleware')

router.get('/',verifyToken,isAdmin, async (req, res) => {
    try {
        const { orderId } = req.query;

        if (!orderId) {
            return res.status(400).json({ message: "Order ID is required" });
        }

        const orderItems = await getOrderItems(orderId);
        
        if (orderItems.length === 0) {
            return res.status(404).json({ message: "No items found for this order" });
        }

        res.status(200).json(orderItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.delete('/:id',verifyToken,isAdmin, async(req, res)=>{
    try {
        const {id} = req.params
        const orderItems = await deleteOrderItem(id)
        res.status(200).json(orderItems)
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
})
module.exports = router;