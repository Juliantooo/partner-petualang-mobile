import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Banner from '../components/Banner';
import { Box, Flex, ScrollView, VStack } from 'native-base';
import useSellItems from '../hooks/useSellItems';
import CardItem from '../components/CardItem';
import SkeletonCard from '../components/Skeleton';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {

  const { isLoading, items } = useSellItems();
  const skeletonNum = Array(6).fill(null).map((_, i) => i);

  const handlePressItemCard = (id) => {
    navigation.navigate('DetailItem', { id })
  }

  return (
    <View style={{ backgroundColor: '#fff' }} >
      <ScrollView>
        <VStack space='4'>
          <Box>
            <Banner />
          </Box>
          <Flex flexDirection='row' flexWrap='wrap' justifyContent='space-around' px='4' >
            {
              isLoading ?
                skeletonNum.map((_, idx) => (
                  <SkeletonCard key={idx} />
                ))
                :
                items.map((item: any) => (
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
        </VStack>
      </ScrollView>
    </View>
  );
}
