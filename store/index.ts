import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'reduxjs-toolkit-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel1 from 'reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1';
import sellItemsSlice from './slicers/sellItems'
import userSlice from './slicers/user'
import wishlistItemsSlice from './slicers/whishlist'
import cartItemsSlice from './slicers/cartItems'
import orderItemsSlice from './slicers/orderItems'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel1,
};

const reducers = combineReducers({
    user: userSlice,
    sellItems: sellItemsSlice,
    wishlistItem: wishlistItemsSlice,
    cartItems: cartItemsSlice,
    orderItems: orderItemsSlice
});
const _persistedReducer = persistReducer(persistConfig, reducers);


export const store = configureStore({
    reducer: _persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            /* ignore persistance actions */
            ignoredActions: [
                FLUSH,
                REHYDRATE,
                PAUSE,
                PERSIST,
                PURGE,
                REGISTER
            ],
        },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch