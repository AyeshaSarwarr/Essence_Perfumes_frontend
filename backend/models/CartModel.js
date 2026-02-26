const pool = require('../db')

const addItemToCart = async (user_id, items) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    let cartRes = await client.query(
      "SELECT id FROM cart WHERE user_id = $1",
      [user_id]
    );

    let cartId;

    if (cartRes.rowCount === 0) {

      const newCart = await client.query(
        "INSERT INTO cart (user_id) VALUES ($1) RETURNING id",
        [user_id]
      );
      cartId = newCart.rows[0].id;
    } else {
      cartId = cartRes.rows[0].id;
    }

    for (const item of items) {
      await client.query(
        `INSERT INTO cart_items (cart_id, product_id, quantity)
         VALUES ($1, $2, $3)
         ON CONFLICT (cart_id, product_id)
         DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity`,
        [cartId, item.product_id, item.quantity]
      );
    }

    await client.query("COMMIT");

    return cartId;

  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

const deleteCart = async (id) => {
    try {
        const res = await pool.query("Delete from cart where id = $1 returning *",[id])
        return res.rows[0]
    } catch (err) {
        throw err;
    }
}

module.exports = {addItemToCart, deleteCart}