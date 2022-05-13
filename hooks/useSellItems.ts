import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { getItems } from "../services/items";
import { SET_SELL_ITEMS } from "../store/slicers/sellItems";
import useLoading from "./useLoading"


const useSellItems = () => {

    const dispatch = useDispatch()

    const { isLoading, setIsLoading } = useLoading();
    const [items, setItems] = useState<any>([]);

    const getAllItems = async () => {
        setIsLoading(true)
        const response = await getItems();

        dispatch(SET_SELL_ITEMS(response));
        setItems(response)
        setIsLoading(false)
    }

    useEffect(() => {
        getAllItems()
    }, [])


    return {
        isLoading,
        items,

        setIsLoading,
        setItems
    }
}


export default useSellItems