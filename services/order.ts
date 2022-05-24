import { doc, addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";


export const handleOrderItems = async ({ user, items, discountAmount, totalPayment, status, paymentMethod, deliveryMethod }: any) => {
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
