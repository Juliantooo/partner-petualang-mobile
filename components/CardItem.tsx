import { Badge, Box, Center, HStack, Image, Text, VStack } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';

const CardItem = ({ image, name, price, discount, category, rented, id, handlePressItemCard }) => {
    return (
        <TouchableOpacity onPress={() => handlePressItemCard(id)}>
            <VStack w='48' space='3' rounded='lg' shadow='6' backgroundColor='white' my='4'>
                <Box position='relative'>
                    <Image rounded='lg' style={{ aspectRatio: 1, resizeMode: 'cover' }} w='full' src={image} alt='product' />
                    <Badge rounded='lg' alignSelf='center' colorScheme='success' variant='solid' position='absolute' bottom={-13} px='5' py='1'  >
                        {category}
                    </Badge>
                </Box>
                <VStack space='1' px='4' mt='2' pb='4'>
                    <Text fontSize='sm'>{name}</Text>
                    <Text fontSize='md' fontWeight='bold'>Rp {price - (price * (discount / 100))}</Text>
                    {
                        discount > 0 &&
                        <HStack space='2' >
                            <Badge colorScheme='error' variant='solid' rounded='lg'>{`${discount}%`}</Badge>
                            <Text fontSize='xs' textDecorationLine='line-through'>Rp {price}</Text>
                        </HStack>
                    }
                    <Text fontSize='xs'>{`Tersewa ${rented}`}</Text>
                </VStack>
            </VStack>
        </TouchableOpacity>
    )
}


export default CardItem