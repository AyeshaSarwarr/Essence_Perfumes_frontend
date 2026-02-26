const pool = require('../db')

const getOrderItems = async (orderId)  =>{
    try {
        const query = `Select oi.perfume_id, oi.quantity, oi.price_at_purchase, p.name as perfume_name, p.picture_url from order_items oi Join perfumes p on oi.perfume_id = p.id where order_id = $1`
        const result = await pool.query(query,[orderId])
        return result.rows
    } catch (error) {
        throw error
    }
}

const deleteOrderItem = async (id)  =>{
    try {
        const result = await pool.query('Delete from order_items where id=$1 returning *',[id])
        return result.rows[0]
    } catch (error) {
        throw error
    }
}

module.exports = {getOrderItems, deleteOrderItem}