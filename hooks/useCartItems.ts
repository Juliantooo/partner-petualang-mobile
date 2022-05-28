import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ICartItem, IOrderItem } from "../libs/interfaces";
import notification from "../libs/notification";
import { updateCartItemsUser } from "../services/user";
import { RootState } from "../store";
import {
    ADD_CART_ITEM,
    ADD_CART_ITEM_COUNT,
    REMOVE_CART_ITEM,
    SET_CART_ITEMS,
    SET_CART_ITEM_COUNT,
    SUBTRACT_CART_ITEM
} from "../store/slicers/cartItems";
import useAuth from "./useAuth";


const useCartItems = () => {

    const dispatch = useDispatch();

    const { userData } = useAuth();
    const cartItems = useSelector((state: RootState) => state.cartItems.cartItems);
    const [cartItemsTotalPayment, setCartItemsTotalPayment] = useState<number>(0);
    const [itemsCount, setItemsCount] = useState<number>(0);
    const [cartItemsCount, setCartItemsCount] = useState<number>(0);
    const [cartItemsDiscount, setCartItemsDiscount] = useState<number>(0);
    const [selectedItemsForOrder, setSelectedItemsForOrder] = useState<IOrderItem[]>([]);

    const findItemWithId = (id: string) => cartItems.find((item: ICartItem) => item.id === id);
    const filterItemsWithId = (id: string, items: any) => items.filter((item: ICartItem) => item.id !== id);

    const addItemToCart = (item: ICartItem) => {
        const cartItem = {
            ...item,
            count: 1,
            note: '',
        }
        dispatch(ADD_CART_ITEM(cartItem));
        notification.success(`Berhasil menambahkan ke keranjang`);
    }

    const setCartItems = (items: Array<ICartItem>) => {
        dispatch(SET_CART_ITEMS(items))
    }

    const removeItemFromCart = (id: string) => {
        dispatch(REMOVE_CART_ITEM(id))
        notification.success(`Berhasil menghapus item`);
    }

    const addCartItemCount = (id: string) => {
        const item: ICartItem = findItemWithId(id)!;
        if (item.count === item.stock) return notification.error('Jumlah barang melebihi stock barang');
        dispatch(ADD_CART_ITEM_COUNT(id));
    }

    const setCartItemCount = (id: string, count: number) => {
        dispatch(SET_CART_ITEM_COUNT({ id, count }));
        notification.success(`Berhasil mengubah jumlah item`);
    }

    const subtractCartItemCount = (id: string) => {
        const item: ICartItem = findItemWithId(id)!;
        if (item.count === 1) return notification.error('Minimal jumlah peminjaman 1 barang');
        dispatch(SUBTRACT_CART_ITEM(id))
    }

    const calculateTotalPayment = async () => {
        const discount = selectedItemsForOrder.reduce((result: number, item: ICartItem) => (result + (item.price! * item.count! * (item.discount! / 100))), 0);
        const totalPayment = selectedItemsForOrder.reduce((result: number, item: ICartItem) => (result + (item.price! * item.count!)), 0)

        setCartItemsDiscount(discount)
        setCartItemsTotalPayment(totalPayment - discount)
    }

    const calculateItemsCount = () => {
        const count = selectedItemsForOrder.reduce((result, item) => (result + item.count!), 0);
        setItemsCount(count)
    }

    const isItemAlreadyInCart = (id: string) => {
        return cartItems.some((item: ICartItem) => item.id === id);
    }

    const addItemToSelectedItemForOrder = (id: string) => {
        const item: ICartItem = findItemWithId(id)!;
        setSelectedItemsForOrder([...selectedItemsForOrder, item])
    }

    const removeItemFromSelectedItemForOrder = (id: string) => {
        const items = filterItemsWithId(id, selectedItemsForOrder);
        setSelectedItemsForOrder(items);
    }

    const selectAllItemsToSelectedItemForOrder = () => {
        setSelectedItemsForOrder(cartItems);
    }

    const removeAllItemsFromSelectedItemForOrder = () => {
        setSelectedItemsForOrder([]);
    }

    const isSelectedItemForOrderContainThisItem = (id: string) => {
        return selectedItemsForOrder.some((item: IOrderItem) => item.id === id);
    }

    useEffect(() => {
        calculateItemsCount()
        calculateTotalPayment()
    }, [selectedItemsForOrder])

    useEffect(() => {
        setCartItemsCount(cartItems.length);
        if (userData.id) {
            updateCartItemsUser(cartItems, userData.id);
        }
        if (selectedItemsForOrder.length > 0) {
            const idItems = selectedItemsForOrder.map((item: IOrderItem) => item.id);
            const newSelectedItemsForOrder = cartItems.filter((item: ICartItem) => idItems.includes(item.id));
            setSelectedItemsForOrder(newSelectedItemsForOrder)
        }
    }, [cartItems])


    return {
        cartItems,
        cartItemsTotalPayment,
        itemsCount,
        cartItemsDiscount,
        selectedItemsForOrder,
        cartItemsCount,

        findItemWithId,
        addItemToCart,
        setCartItems,
        subtractCartItemCount,
        removeItemFromCart,
        isItemAlreadyInCart,
        addCartItemCount,
        setCartItemCount,
        addItemToSelectedItemForOrder,
        removeItemFromSelectedItemForOrder,
        selectAllItemsToSelectedItemForOrder,
        removeAllItemsFromSelectedItemForOrder,
        isSelectedItemForOrderContainThisItem
    }


}

export default useCartItems