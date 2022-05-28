import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { IItem } from "../libs/interfaces";
import { getItems } from "../services/items";
import { RootState } from "../store";
import { SET_SELL_ITEMS } from "../store/slicers/sellItems";
import useLoading from "./useLoading"


interface IfilterItemsProps {
    sortBy?: string,
    searchKeywords?: string,
    items?: IItem[]
}

const useSellItems = () => {
    const ASCENDING = 'ASCENDING'
    const DESCENDING = 'DESCENDING'

    const dispatch = useDispatch()
    const searchKeywords = useSelector((state: RootState) => state.sellItems.searchKeywords)
    const { isLoading, setIsLoading } = useLoading();
    const [items, setItems] = useState<IItem[]>([]);
    const [filteredItems, setFilteredItems] = useState<IItem[]>([]);

    const getAllItems = async () => {
        setIsLoading(true)
        const response = await getItems();

        dispatch(SET_SELL_ITEMS(response));
        setItems(response)
        filterItems({ sortBy: '', items: response });
        setIsLoading(false)
    }

    const filterItems = ({ sortBy, items }: IfilterItemsProps) => {
        if (sortBy === ASCENDING) {
            const newItems = [...items!].sort((itemA: IItem, itemB: IItem) => itemA.price! - itemB.price!);
            setFilteredItems(newItems)
        } else if (sortBy === DESCENDING) {
            const newItems = [...items!].sort((itemA: IItem, itemB: IItem) => itemB.price! - itemA.price!);
            setFilteredItems(newItems)
        } else {
            setFilteredItems(items!);
        }

    }

    useEffect(() => {
        getAllItems()
    }, [])


    return {
        ASCENDING,
        DESCENDING,

        isLoading,
        items,
        filteredItems,
        searchKeywords,

        setIsLoading,
        setFilteredItems,
        setItems,
        filterItems,
    }
}


export default useSellItems