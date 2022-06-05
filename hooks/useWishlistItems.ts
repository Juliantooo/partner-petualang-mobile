import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterDataById } from "../libs/helpers";
import { IItem, IWishlistItem } from "../libs/interfaces";
import notification from "../libs/notification";
import { updateWishlistUser } from "../services/user";
import { RootState } from "../store";
import {
  ADD_WISH_LIST_ITEM,
  REMOVE_WISH_LIST_ITEM,
  SET_WISH_LIST_ITEMS,
} from "../store/slicers/whishlist";
import useAuth from "./useAuth";

const useWishlistItems = () => {
  const dispatch = useDispatch();
  const { userData } = useAuth();
  const wishlistItems = useSelector(
    (state: RootState) => state.wishlistItem.wishlistItems,
  );

  const [wishlistItemsCount, setWishlistItemsCount] = useState<number>(0);

  const setWishListItems = async (items: IItem[]) => {
    dispatch(SET_WISH_LIST_ITEMS(items));
    await updateWishlistUser(items, userData.id!);
  };

  const addItemToWishlist = async (item: IItem) => {
    dispatch(ADD_WISH_LIST_ITEM(item));
    notification.success(`Berhasil menambahkan ke wishlist`);
    const items = [...wishlistItems, item];
    await updateWishlistUser(items, userData.id!);
  };

  const removeItemFromWishlist = async (id: string) => {
    dispatch(REMOVE_WISH_LIST_ITEM(id));
    notification.success(`Berhasil menghapus wishlist`);
    const items: IWishlistItem[] = filterDataById(wishlistItems, id);
    await updateWishlistUser(items, userData.id!);
  };

  const isWishlistItem = (id: string) => {
    return wishlistItems.some((item: IWishlistItem) => item.id === id);
  };

  useEffect(() => {
    setWishlistItemsCount(wishlistItems.length);
  }, [wishlistItems]);

  return {
    wishlistItems,
    wishlistItemsCount,

    addItemToWishlist,
    removeItemFromWishlist,
    isWishlistItem,
    setWishListItems,
  };
};

export default useWishlistItems;
