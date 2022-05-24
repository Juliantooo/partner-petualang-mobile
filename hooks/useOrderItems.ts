import { useDispatch, useSelector } from "react-redux"
import { IOrder, IOrderItem } from "../libs/interfaces";
import notification from "../libs/notification";
import { RootState } from "../store";
import { SET_ORDER, SET_ORDER_HISTORY, SET_ORDER_ITEMS } from "../store/slicers/orderItems";

interface ISetOrderItemsProps {
    items: IOrderItem[],
    isShowNotification: boolean
}

const useOrderItems = () => {

    const dispatch = useDispatch();
    const order = useSelector((state: RootState) => state.orderItems.order);
    const orderItems = useSelector((state: RootState) => state.orderItems.orderItems);
    const ordersHistory = useSelector((state: RootState) => state.orderItems.ordersHistory);

    const setOrderItems = ({ items, isShowNotification = true }: ISetOrderItemsProps) => {
        dispatch(SET_ORDER_ITEMS(items));
        if (isShowNotification) {
            notification.success('Lanjutkan pembayaran untuk menyelesaikan transaksi');
        }
    }

    const setOrder = (order: IOrder) => {
        dispatch(SET_ORDER(order));
    }

    const setOrdersHistory = (orders: IOrder[]) => {
        dispatch(SET_ORDER_HISTORY(orders));
    }

    return {
        orderItems,
        order,
        ordersHistory,

        setOrderItems,
        setOrder,
        setOrdersHistory
    }
}

export default useOrderItems