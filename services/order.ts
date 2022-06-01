import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { IOrder } from "../libs/interfaces";

type IOrderProps = IOrder

export const handleOrderItems = async ({ user, items, discountAmount, totalPayment, status, paymentMethod, deliveryMethod }: IOrderProps) => {
    const response = await addDoc(collection(db, "orders"), {
        user,
        items,
        discountAmount,
        totalPayment,
        status,
        paymentMethod,
        deliveryMethod,
    }).then((response) => response)

    return response
}
