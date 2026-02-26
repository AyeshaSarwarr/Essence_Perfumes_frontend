const pool = require('../db')

const createFullOrder = async (orderData, items) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const orderRes = await client.query(
            'INSERT INTO orders (user_id, total_price, shipping_address, guest_email, guest_phone_number, guest_name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
            [orderData.user_id, orderData.total_price, orderData.shipping_address, orderData.guest_email, orderData.guest_phone_number, orderData.guest_name]
        );
        const orderId = orderRes.rows[0].id;

        for (const item of items) {

            const currentStockRes = await client.query(
                'SELECT stock_qty, name FROM perfumes WHERE id = $1',
                [item.perfume_id]
            );

            const product = currentStockRes.rows[0];

            if (product.stock_qty < item.quantity) {
                throw new Error(`Sorry, we only have ${product.stock_qty} bottles of ${product.name} left.`);
            }

            await client.query(
                'UPDATE perfumes SET stock_qty = stock_qty - $1 WHERE id = $2',
                [item.quantity, item.perfume_id]
            );

            await client.query(
                'INSERT INTO order_items (order_id, perfume_id, quantity, price_at_purchase) VALUES ($1, $2, $3, $4)',
                [orderId, item.perfume_id, item.quantity, item.price]
            );
        }

        await client.query('COMMIT');
        return orderId;

    } catch (err) {

        await client.query('ROLLBACK'); 
        throw err;

    } finally {

        client.release();
    }
};

const getOrders = async ()  =>{
    try {

        const result = await pool.query('Select * from orders')
        return result.rows
    } catch(error){
        throw error
    }
}
const getOrderById = async (id)  =>{
    try {
        const result = await pool.query('Select * from orders where id=$1',[id])
        return result.rows
    } catch(error){
        throw error
    }
}
const updateOrder = async ( totalPrice, status, shippingAddress, guestEmail, guestPhoneNumber, guestName, id)  =>{
    try {
        const result = await pool.query('Update orders set total_price=$1, status=$2, shipping_address=$3, guest_email=$4, guest_phone_number=$5, guest_name=$6 where id=$7 returning *', [totalPrice, status, shippingAddress, guestEmail, guestPhoneNumber, guestName, id])
        return result.rows[0]
    } catch (error) {
        throw error
    }
}
const deleteOrder = async (id)  =>{
    try {
        const result = await pool.query('Delete from orders where id=$1 returning *',[id])
        return result.rows[0]
    } catch (error) {
        throw error
    }
}

module.exports = {getOrders, createFullOrder, updateOrder, deleteOrder, getOrderById}