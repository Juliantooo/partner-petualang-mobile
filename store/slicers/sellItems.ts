import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const initialState = {
    sellItems: [],
}

export const sellItemsSlice = createSlice({
    name: 'sellItems',
    initialState,
    reducers: {
        SET_SELL_ITEMS: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                sellItems: action.payload
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { SET_SELL_ITEMS } = sellItemsSlice.actions

export default sellItemsSlice.reducer