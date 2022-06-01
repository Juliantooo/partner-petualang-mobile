import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICartItem } from '../../libs/interfaces'

interface IInitialState {
    cartItems: Array<ICartItem>
}

const initialState: IInitialState = {
    cartItems: [],
}

export const cartItemsSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers: {
        ADD_CART_ITEM: (state, action: PayloadAction<ICartItem>) => {
            return {
                ...state,
                cartItems: [action.payload, ...state.cartItems]
            }
        },
        SET_CART_ITEMS: (state, action: PayloadAction<ICartItem[]>) => {
            return {
                ...state,
                cartItems: action.payload
            }
        },
        REMOVE_CART_ITEM: (state, action: PayloadAction<string>) => {
            const newWishListItems = state.cartItems.filter((item: ICartItem) => item.id !== action.payload)
            return {
                ...state,
                cartItems: newWishListItems
            }
        },
        SUBTRACT_CART_ITEM: (state, action: PayloadAction<string>) => {
            const item: ICartItem = state.cartItems.find((item: ICartItem) => item.id === action.payload)!;
            if (item.count) item.count -= 1;
            return state;
        },
        ADD_CART_ITEM_COUNT: (state, action: PayloadAction<string>) => {
            const item: ICartItem = state.cartItems.find((item: ICartItem) => item.id === action.payload)!;
            if (item.count) item.count += 1;
            return state;
        },
        SET_CART_ITEM_COUNT: (state, action: PayloadAction<string>) => {
            const item: ICartItem = state.cartItems.find((item: ICartItem) => item.id === action.payload.id)!;
            if (item.count) item.count = action.payload.count;
            return state;
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    ADD_CART_ITEM,
    SET_CART_ITEMS,
    REMOVE_CART_ITEM,
    SUBTRACT_CART_ITEM,
    ADD_CART_ITEM_COUNT,
    SET_CART_ITEM_COUNT,
} = cartItemsSlice.actions

export default cartItemsSlice.reducer