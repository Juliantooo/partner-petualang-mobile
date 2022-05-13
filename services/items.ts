import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase/firebase"



export const getItems = async () => {
    const querySnapshot = await getDocs(collection(db, 'items'));
    const items = []
    querySnapshot.forEach((doc) => {
        items.push({
            ...doc.data(),
            id: doc.id
        })
    });

    return items
}