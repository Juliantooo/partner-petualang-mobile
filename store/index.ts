import { configureStore } from '@reduxjs/toolkit'
import sellItemsSlice from './slicers/sellItems'
import userSlice from './slicers/user'
import wishlistItemsSlice from './slicers/whishlist'
import cartItemsSlice from './slicers/cartItems'
import orderItemsSlice from './slicers/orderItems'

export const store = configureStore({
    reducer: {
        user: userSlice,
        sellItems: sellItemsSlice,
        wishlistItem: wishlistItemsSlice,
        cartItems: cartItemsSlice,
        orderItems: orderItemsSlice
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch