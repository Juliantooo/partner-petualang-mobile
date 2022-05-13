import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const initialState = {
    orderItems: [],
}

export const orderItemsSlice = createSlice({
    name: 'orderItems',
    initialState,
    reducers: {
        SET_ORDER_ITEMS: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                orderItems: action.payload
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    SET_ORDER_ITEMS
} = orderItemsSlice.actions

export default orderItemsSlice.reducer