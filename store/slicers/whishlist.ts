import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const initialState = {
    whishlistItems: [],
}

export const whishlistItemsSlice = createSlice({
    name: 'whishlistItems',
    initialState,
    reducers: {
        ADD_WISH_LIST_ITEM: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                whishlistItems: [action.payload, ...state.whishlistItems]
            }
        },
        REMOVE_WISH_LIST_ITEM: (state, action: PayloadAction<any>) => {
            const newWishListItems = state.whishlistItems.filter((item) => item.id !== action.payload)
            return {
                ...state,
                whishlistItems: newWishListItems
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { ADD_WISH_LIST_ITEM, REMOVE_WISH_LIST_ITEM } = whishlistItemsSlice.actions

export default whishlistItemsSlice.reducer