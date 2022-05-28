import dayjs from "dayjs";
import { useEffect, useState } from "react";
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

    const [startRentDate, setStartRentDate] = useState<string>();
    const [endRentDate, setEndRentDate] = useState<string>('');
    const [daysOfRent, setdaysOfRent] = useState<number>(0);

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

    useEffect(() => {
        if (startRentDate && endRentDate) {
            const startDate = startRentDate.split('-');
            const endDate = endRentDate.split('-')
            const start = dayjs().set('date', parseInt(startDate[0])).set('month', parseInt(startDate[1])).set('year', parseInt(startDate[2]))
            const end = dayjs().set('date', parseInt(endDate[0])).set('month', parseInt(endDate[1])).set('year', parseInt(endDate[2]))
            const dif = end.diff(start, 'day')
            setdaysOfRent(dif)
        }
    }, [startRentDate, endRentDate])

    return {
        orderItems,
        order,
        ordersHistory,
        startRentDate,
        endRentDate,

        setOrderItems,
        setOrder,
        setOrdersHistory,
        setStartRentDate,
        setEndRentDate,
        daysOfRent
    }
}

export default useOrderItems