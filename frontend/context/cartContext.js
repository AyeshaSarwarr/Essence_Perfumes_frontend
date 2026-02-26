import { createContext, use, useContext } from "react";

const CartContext = createContext({
    cart: [
        { id: 1, quantity: 2 },
    ],
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: () => {}
});

const CartProvider = CartContext.Provider;

const useCart = () => {
    return useContext(CartContext);
}

export default CartProvider;
export { useCart };