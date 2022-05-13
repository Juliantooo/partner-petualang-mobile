
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import notification from '../libs/notification';
import { RootState } from "../store"
import { ADD_WISH_LIST_ITEM, REMOVE_WISH_LIST_ITEM } from '../store/slicers/whishlist';

const useWishlistItems = () => {

    const dispatch = useDispatch();
    const wishlistItems = useSelector((state: RootState) => state.wishlistItem.whishlistItems);

    const [wishlistItemsCount, setWishlistItemsCount] = useState<number>(0);

    const addItemToWishlist = (item: any) => {
        notification.success(`Berhasil menambahkan ke wishlist`);
        dispatch(ADD_WISH_LIST_ITEM(item));
    }

    const removeItemFromWishlist = (id: string) => {
        dispatch(REMOVE_WISH_LIST_ITEM(id));
        notification.success(`Berhasil menghapus wishlist`);
    }

    const isWishlistItem = (id: string) => {
        return wishlistItems.some((item) => item.id === id);
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