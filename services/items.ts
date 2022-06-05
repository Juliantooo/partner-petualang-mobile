import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { IItem } from "../libs/interfaces";
interface IUpdateItemProps {
  stock: number;
  rented: number;
}

export const getItems = async () => {
  const querySnapshot = await getDocs(collection(db, "items"));
  const items: Array<IItem> = [];
  querySnapshot.forEach((doc) => {
    items.push({
      ...doc.data(),
      id: doc.id,
    });
  });

  return items;
};

export const itemsServiceUpdateItem = async (
  data: IUpdateItemProps,
  idItem: string,
) => {
  const itemRef = doc(db, "items", idItem);

  await updateDoc(itemRef, data);
};
