import {
  Badge,
  Box,
  Center,
  Divider,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React from "react";

interface ICardItemsProps {
  image?: string;
  name: string;
  price: number;
  discount: number;
  stock: number;
  category: string;
  rented: number;
  id: string;
  handlePressItemCard: (id: string) => void;
}

const CardItem = ({
  image,
  name,
  price,
  discount,
  category,
  rented,
  id,
  stock,
  handlePressItemCard,
}: ICardItemsProps) => {
  return (
    <Pressable onPress={() => (stock <= 0 ? null : handlePressItemCard(id))}>
      <Box position='relative'>
        {stock <= 0 ? (
          <Center position='absolute' w='full' top='1/2'>
            <Text
              fontSize='4xl'
              style={{ elevation: 100, marginTop: -25 }}
              color='danger.400'
              fontWeight='bold'>
              HABIS
            </Text>
          </Center>
        ) : null}
        <VStack
          opacity={stock <= 0 ? "0.4" : "1"}
          w='48'
          space='3'
          rounded='lg'
          shadow='6'
          backgroundColor='white'
          my='4'>
          <Box position='relative'>
            <Image
              rounded='lg'
              style={{ aspectRatio: 1, resizeMode: "cover" }}
              w='full'
              src={image}
              alt='product'
            />
            <Badge
              rounded='lg'
              alignSelf='center'
              colorScheme='success'
              variant='solid'
              position='absolute'
              bottom={-13}
              px='5'
              py='1'>
              {category}
            </Badge>
          </Box>
          <VStack space='1' px='4' mt='2' pb='4'>
            <Text fontSize='sm'>{name}</Text>
            <Text fontSize='md' fontWeight='bold'>
              Rp {price - price * (discount / 100)}
            </Text>
            {discount > 0 && (
              <HStack space='2'>
                <Badge
                  colorScheme='error'
                  variant='solid'
                  rounded='lg'>{`${discount}%`}</Badge>
                <Text fontSize='xs' textDecorationLine='line-through'>
                  Rp {price}
                </Text>
              </HStack>
            )}
            <HStack space='2'>
              <Text fontSize='xs'>{`Tersisa ${stock}`}</Text>
              <Divider orientation='vertical' color='black' />
              <Text fontSize='xs'>{`Tersewa ${rented}`}</Text>
            </HStack>
          </VStack>
        </VStack>
      </Box>
    </Pressable>
  );
};

export default CardItem;
