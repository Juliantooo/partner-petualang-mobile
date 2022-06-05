import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IItem } from "../../libs/interfaces";

interface IInitialState {
  sellItems: Array<IItem>;
  searchKeywords?: string;
}

const initialState: IInitialState = {
  sellItems: [],
  searchKeywords: "",
};

export const sellItemsSlice = createSlice({
  name: "sellItems",
  initialState,
  reducers: {
    SET_SELL_ITEMS: (state, action: PayloadAction<IItem[]>) => {
      return {
        ...state,
        sellItems: action.payload,
      };
    },
    SET_SEARCH_KEYWORDS: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        searchKeywords: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { SET_SELL_ITEMS, SET_SEARCH_KEYWORDS } = sellItemsSlice.actions;

export default sellItemsSlice.reducer;
