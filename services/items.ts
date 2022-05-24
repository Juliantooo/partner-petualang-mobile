import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase/firebase"
import { IItem } from "../libs/interfaces";



export const getItems = async () => {
    const querySnapshot = await getDocs(collection(db, 'items'));
    const items: Array<IItem> = []
    querySnapshot.forEach((doc) => {
        items.push({
            ...doc.data(),
            id: doc.id
        })
    });

    return items
}