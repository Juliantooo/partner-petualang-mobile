import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Banner from '../components/Banner';
import { Box, CheckIcon, Flex, HStack, ScrollView, Select, Text, VStack } from 'native-base';
import useSellItems from '../hooks/useSellItems';
import CardItem from '../components/CardItem';
import SkeletonCard from '../components/Skeleton';
import { useEffect, useState } from 'react';
import { IItem } from '../libs/interfaces';


export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {

  const { isLoading, items, ASCENDING, DESCENDING, filterItems, filteredItems, searchKeywords, setFilteredItems } = useSellItems();
  const skeletonNum = Array(6).fill(null).map((_, i) => i);

  const [filterType, setFilterType] = useState('');

  const handlePressItemCard = (id: string) => {
    navigation.navigate('DetailItem', { id })
  }

  const searchItems = () => {
    if (searchKeywords) {
      const searchedItems = items.filter((item: IItem) => item.name?.toLowerCase().includes(searchKeywords.toLowerCase()))
      setFilteredItems(searchedItems)
    } else {
      setFilteredItems(items)
    }
  }

  useEffect(() => {
    searchItems()
  }, [searchKeywords])

  useEffect(() => {
    filterItems({
      sortBy: filterType,
      items: filteredItems
    });
  }, [filterType])



  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }} >
      <ScrollView>
        <VStack space='4'>
          <Box>
            <Banner />
          </Box>
          <Box px='2' >
            <HStack px='3' mb='2' alignItems='center' justifyContent='space-between'>
              <Text fontSize='lg' fontWeight='bold'>Daftar Barang</Text>
              <Box w='180'>
                <Select rounded='sm' py='1' selectedValue={filterType} accessibilityLabel="sort" placeholder="Urutkan" _selectedItem={{
                  bg: "gray.200",
                  endIcon: <CheckIcon size="5" />
                }} mt={1} onValueChange={value => setFilterType(value)}>
                  <Select.Item label="Harga terendah" value={ASCENDING} />
                  <Select.Item label="Harga tertinggi" value={DESCENDING} />
                </Select>
              </Box>
            </HStack>
            <Flex flexDirection='row' flexWrap='wrap' justifyContent='space-around'>
              {
                isLoading ?
                  skeletonNum.map((_, idx) => (
                    <SkeletonCard key={idx} />
                  ))
                  :
                  filteredItems.map((item: any) => (
                    <CardItem
                      key={item.id}
                      image={item.image}
                      name={item.name}
                      price={item.price}
                      discount={item.discount}
                      category={item.category}
                      rented={item.rented}
                      id={item.id}
                      handlePressItemCard={handlePressItemCard}
                    />
                  ))
              }
            </Flex>
          </Box>
        </VStack>
      </ScrollView>
    </View>
  );
}
