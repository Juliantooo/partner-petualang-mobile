import { View } from "../../components/Themed";
import { RootTabScreenProps } from "../../types";
import {
  Box,
  CheckIcon,
  Flex,
  HStack,
  ScrollView,
  Select,
  Text,
  VStack,
} from "native-base";
import useSellItems from "../../hooks/useSellItems";
import CardItem from "./parts/CardItem";
import SkeletonCard from "../../components/Skeleton";
import { IItem } from "../../libs/interfaces";
import { ROUTES_NAME } from "../../libs/router";
import { useEffect } from "react";

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  const {
    isLoading,
    filterItemsOption,
    filteredItems,
    filterType,
    getAllItems,
    setFilterType,
  } = useSellItems();
  const skeletonNum = Array(6)
    .fill(null)
    .map((_, i) => i);

  const handlePressItemCard = (id: string) => {
    navigation.navigate(ROUTES_NAME.DETAIL_ITEM, { id });
  };

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>
        <VStack space='3' mt='3'>
          {/* <Box>
            <Banner />
          </Box> */}
          <Box px='2'>
            <HStack
              px='3'
              mb='2'
              alignItems='center'
              justifyContent='space-between'>
              <Text fontSize='lg' fontWeight='bold'>
                Daftar Barang
              </Text>
              <Box w='180'>
                <Select
                  rounded='sm'
                  py='1'
                  selectedValue={filterType}
                  accessibilityLabel='sort'
                  placeholder='Urutkan'
                  _selectedItem={{
                    bg: "gray.200",
                    endIcon: <CheckIcon size='5' />,
                  }}
                  mt={1}
                  onValueChange={(value) => setFilterType(value)}>
                  <Select.Item
                    label='Harga terendah'
                    value={filterItemsOption.ASCENDING}
                  />
                  <Select.Item
                    label='Harga tertinggi'
                    value={filterItemsOption.DESCENDING}
                  />
                </Select>
              </Box>
            </HStack>
            <Flex
              flexDirection='row'
              flexWrap='wrap'
              justifyContent='space-around'>
              {isLoading
                ? skeletonNum.map((_, idx) => <SkeletonCard key={idx} />)
                : filteredItems.map((item: IItem) => (
                    <CardItem
                      key={item.id}
                      image={item.image}
                      name={item.name}
                      price={item.price}
                      discount={item.discount}
                      category={item.category}
                      rented={item.rented}
                      stock={item.stock}
                      id={item.id}
                      handlePressItemCard={handlePressItemCard}
                    />
                  ))}
            </Flex>
          </Box>
        </VStack>
      </ScrollView>
    </View>
  );
}
