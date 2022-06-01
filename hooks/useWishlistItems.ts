
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { IItem, IWishlistItem } from '../libs/interfaces';
import notification from '../libs/notification';
import { updateWishlistUser } from '../services/user';
import { RootState } from "../store"
import { ADD_WISH_LIST_ITEM, REMOVE_WISH_LIST_ITEM } from '../store/slicers/whishlist';
import useAuth from './useAuth';

const useWishlistItems = () => {

    const dispatch = useDispatch();
    const { userData } = useAuth();
    const wishlistItems = useSelector((state: RootState) => state.wishlistItem.wishlistItems);

    const [wishlistItemsCount, setWishlistItemsCount] = useState<number>(0);

    const addItemToWishlist = async (item: IItem) => {
        dispatch(ADD_WISH_LIST_ITEM(item));
        notification.success(`Berhasil menambahkan ke wishlist`);
        const items = [...wishlistItems, item]
        await updateWishlistUser(items, userData.id!);
    }

    const removeItemFromWishlist = async (id: string) => {
        dispatch(REMOVE_WISH_LIST_ITEM(id));
        notification.success(`Berhasil menghapus wishlist`);
        const items = wishlistItems.filter((item: IWishlistItem) => item.id !== id);
        await updateWishlistUser(items, userData.id!);
    }

    const isWishlistItem = (id: string) => {
        return wishlistItems.some((item: IWishlistItem) => item.id === id);
    }

    useEffect(() => {
        setWishlistItemsCount(wishlistItems.length)
    }, [wishlistItems])


    return {
        wishlistItems,
        wishlistItemsCount,

        addItemToWishlist,
        removeItemFromWishlist,
        isWishlistItem
    }


}

export default useWishlistItems