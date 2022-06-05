import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { filterDataById } from "../../libs/helpers";
import { IWishlistItem } from "../../libs/interfaces";

interface IInitialState {
  wishlistItems: Array<IWishlistItem>;
}

const initialState: IInitialState = {
  wishlistItems: [],
};

export const wishlistItemsSlice = createSlice({
  name: "wishlistItems",
  initialState,
  reducers: {
    SET_WISH_LIST_ITEMS: (state, action: PayloadAction<IWishlistItem[]>) => {
      return {
        ...state,
        wishlistItems: action.payload,
      };
    },
    ADD_WISH_LIST_ITEM: (state, action: PayloadAction<IWishlistItem>) => {
      return {
        ...state,
        wishlistItems: [action.payload, ...state.wishlistItems],
      };
    },
    REMOVE_WISH_LIST_ITEM: (state, action: PayloadAction<string>) => {
      const newWishListItems = filterDataById(
        state.wishlistItems,
        action.payload,
      );
      return {
        ...state,
        wishlistItems: newWishListItems,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  SET_WISH_LIST_ITEMS,
  ADD_WISH_LIST_ITEM,
  REMOVE_WISH_LIST_ITEM,
} = wishlistItemsSlice.actions;

export default wishlistItemsSlice.reducer;
