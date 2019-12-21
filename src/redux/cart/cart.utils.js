export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id)

    if (existingCartItem) {
        return cartItems.map(cartItem => cartItem.id === cartItemToAdd.id ? {
            ...cartItem,
            quantity: cartItem.quantity + 1
        } : cartItem)
    }

    return [...cartItems, {
        ...cartItemToAdd,
        quantity: 1
    }]
}

export const decrementItemFromCart = (cartItems, cartItemToDecrement) => {
    if (cartItemToDecrement.quantity > 1) {
        return cartItems.map(cartItem => cartItem.id === cartItemToDecrement.id ? {
            ...cartItem,
            quantity: cartItem.quantity -= 1
        } : cartItem)
    }

    return cartItems.filter(
        cartItem => cartItem.id !== cartItemToDecrement.id
    )
}


export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    return cartItems.filter(
        cartItem => cartItem.id !== cartItemToRemove.id
    )
}