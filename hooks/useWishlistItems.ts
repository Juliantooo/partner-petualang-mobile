import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterDataById } from "../libs/helpers";
import { IItem, IWishlistItem } from "../libs/interfaces";
import notification from "../libs/notification";
import { getItems } from "../services/items";
import { updateWishlistUser } from "../services/user";
import { RootState } from "../store";
import {
  ADD_WISH_LIST_ITEM,
  REMOVE_WISH_LIST_ITEM,
  SET_WISH_LIST_ITEMS,
} from "../store/slicers/whishlist";
import useAuth from "./useAuth";
import useLoading from "./useLoading";

const useWishlistItems = () => {
  const dispatch = useDispatch();
  const { userData } = useAuth();
  const wishlistItems = useSelector(
    (state: RootState) => state.wishlistItem.wishlistItems,
  );
  const isFocused = useIsFocused();
  const { isLoading, setIsLoading } = useLoading();

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

  const updateUsersWishlistItems = async () => {
    setIsLoading(true);
    const wishlistItemsId: Array<string> = wishlistItems.map(
      (item: IWishlistItem) => item.id,
    );
    const items = await getItems();
    const newWishlistItems: Array<IWishlistItem> = items.filter((item: IItem) =>
      wishlistItemsId.includes(item.id),
    );
    setWishListItems(newWishlistItems);
    setIsLoading(false);
  };

  useEffect(() => {
    setWishlistItemsCount(wishlistItems.length);
  }, [wishlistItems]);

  useEffect(() => {
    if (userData.id) {
      updateUsersWishlistItems();
    }
  }, [isFocused]);

  return {
    wishlistItems,
    wishlistItemsCount,
    isLoading,

    setIsLoading,
    addItemToWishlist,
    removeItemFromWishlist,
    isWishlistItem,
    setWishListItems,
  };
};

export default useWishlistItems;
