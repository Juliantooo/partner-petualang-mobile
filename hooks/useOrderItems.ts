import { useDispatch, useSelector } from "react-redux"
import notification from "../libs/notification";
import { RootState } from "../store";
import { SET_ORDER_ITEMS } from "../store/slicers/orderItems";


const useOrderItems = () => {

    const dispatch = useDispatch();
    const orderItems = useSelector((state: RootState) => state.orderItems.orderItems);

    const setOrderItems = (items: any) => {
        dispatch(SET_ORDER_ITEMS(items));
        notification.success('Lanjutkan pembayaran untuk menyelesaikan transaksi');
    }

    return {
        orderItems,
        setOrderItems
    }
}

export default useOrderItems