import {
    createSelector
} from 'reselect';

//input selector takes the whole state and get a slice of it which is cart
const selectCart = state => state.cart;

//output selector
export const selectCartItems = createSelector(
    //collection of input collectors
    [selectCart],
    //return what we want as output
    cart => cart.cartItems
);

export const selectCartToggle = createSelector(
    [selectCart],
    cart => cart.hidden
)

//output selector
export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems =>
    cartItems.reduce(
        (accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity,
        0
    )
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems =>
    cartItems.reduce(
        (accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity * cartItem.price,
        0
    )
)