const pool = require('../db')

const getCart = async (userId) => {
    try {
        const res = await pool.query(
    `SELECT ci.*, p.name, p.price, p.picture_url 
         FROM cart_items ci
         JOIN cart c ON ci.cart_id = c.id
         JOIN perfumes p ON ci.product_id = p.id
         WHERE c.user_id = $1`,
    [userId]
  );
        return res.rows
    } catch (error) {
        throw error
    }
}

const updateItem = async (id, quantity) => {
    try {
        if(quantity <= 0)
            return await deleteItem(id)


        const res = await pool.query("UPDATE cart_items SET quantity = $1 where id = $2 returning *",[quantity,id])
        return res.rows[0]
    } catch (err) {
        throw err;
    }
}

const deleteItem = async (id) => {
    try {
        const res = await pool.query("Delete from cart_items where id = $1 returning *",[id])
        return res.rows[0]
    } catch (err) {
        throw err;
    }
}

module.exports = {getCart, updateItem, deleteItem}