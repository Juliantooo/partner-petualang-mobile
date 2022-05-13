import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const initialState = {
    cartItems: [],
}

export const cartItemsSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers: {
        ADD_CART_ITEM: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                cartItems: [action.payload, ...state.cartItems]
            }
        },
        REMOVE_CART_ITEM: (state, action: PayloadAction<any>) => {
            const newWishListItems = state.cartItems.filter((item) => item.id !== action.payload)
            return {
                ...state,
                cartItems: newWishListItems
            }
        },
        SUBTRACT_CART_ITEM: (state, action: PayloadAction<any>) => {
            const item = state.cartItems.find((item) => item.id === action.payload);
            item.count -= 1;
            return state;
        },
        ADD_CART_ITEM_COUNT: (state, action: PayloadAction<any>) => {
            const item = state.cartItems.find((item) => item.id === action.payload);
            item.count += 1;
            return state;
        },
        SET_CART_ITEM_COUNT: (state, action: PayloadAction<any>) => {
            const item = state.cartItems.find((item) => item.id === action.payload.id);
            item.count = action.payload.count;
            return state;
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    ADD_CART_ITEM,
    REMOVE_CART_ITEM,
    SUBTRACT_CART_ITEM,
    ADD_CART_ITEM_COUNT,
    SET_CART_ITEM_COUNT,
} = cartItemsSlice.actions

export default cartItemsSlice.reducer