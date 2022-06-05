import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IItem } from "../libs/interfaces";
import { getItems } from "../services/items";
import { RootState } from "../store";
import { SET_SELL_ITEMS } from "../store/slicers/sellItems";
import useLoading from "./useLoading";

interface IfilterItemsProps {
  sortBy?: string;
  searchKeywords?: string;
  items?: IItem[];
}

const useSellItems = () => {
  enum filterItemsOption {
    ASCENDING = "ASCENDING",
    DESCENDING = "DESCENDING",
  }

  const dispatch = useDispatch();
  const searchKeywords = useSelector(
    (state: RootState) => state.sellItems.searchKeywords,
  );
  const items = useSelector((state: RootState) => state.sellItems.sellItems);
  const { isLoading, setIsLoading } = useLoading();
  // const [items, setItems] = useState<IItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<IItem[]>([]);
  const [filterType, setFilterType] = useState<string>("");

  const getAllItems = async () => {
    setIsLoading(true);
    const response = await getItems();

    dispatch(SET_SELL_ITEMS(response));
    filterItems({ sortBy: "", items: response });
    setIsLoading(false);
  };

  const filterItems = ({ sortBy, items }: IfilterItemsProps) => {
    if (sortBy === filterItemsOption.ASCENDING) {
      const newItems = [...items!].sort(
        (itemA: IItem, itemB: IItem) => itemA.price - itemB.price,
      );
      setFilteredItems(newItems);
    } else if (sortBy === filterItemsOption.DESCENDING) {
      const newItems = [...items!].sort(
        (itemA: IItem, itemB: IItem) => itemB.price - itemA.price,
      );
      setFilteredItems(newItems);
    } else {
      setFilteredItems(items!);
    }
  };

  const searchItemsByName = () => {
    if (searchKeywords) {
      const searchedItems = items.filter((item: IItem) =>
        item.name?.toLowerCase().includes(searchKeywords.toLowerCase()),
      );
      setFilteredItems(searchedItems);
    } else {
      setFilteredItems(items);
    }
  };

  useEffect(() => {
    getAllItems();
  }, []);

  useEffect(() => {
    filterItems({ sortBy: "", items });
  }, [items]);

  useEffect(() => {
    searchItemsByName();
  }, [searchKeywords]);

  useEffect(() => {
    filterItems({
      sortBy: filterType,
      items: filteredItems,
    });
  }, [filterType]);

  return {
    filterItemsOption,

    isLoading,
    items,
    filteredItems,
    searchKeywords,
    filterType,

    setIsLoading,
    setFilteredItems,
    filterItems,
    setFilterType,
    getAllItems,
  };
};

export default useSellItems;
