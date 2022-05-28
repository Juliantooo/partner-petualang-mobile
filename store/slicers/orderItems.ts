import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IOrder, IOrderItem } from '../../libs/interfaces'

interface IOrderSliceState {
    orderItems: Array<IOrderItem>,
    order: IOrder,
    ordersHistory: Array<IOrder>
}

const initialState: IOrderSliceState = {
    orderItems: [],
    order: {},
    ordersHistory: [],
}

export const orderItemsSlice = createSlice({
    name: 'orderItems',
    initialState,
    reducers: {
        SET_ORDER_ITEMS: (state, action: PayloadAction<IOrderItem[]>) => {
            return {
                ...state,
                orderItems: action.payload
            }
        },
        SET_ORDER: (state, action: PayloadAction<IOrder>) => {
            return {
                ...state,
                order: { ...action.payload }
            }
        },
        SET_ORDER_HISTORY: (state, action: PayloadAction<IOrder[]>) => {
            return {
                ...state,
                ordersHistory: action.payload
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    SET_ORDER_ITEMS,
    SET_ORDER,
    SET_ORDER_HISTORY
} = orderItemsSlice.actions

export default orderItemsSlice.reducer