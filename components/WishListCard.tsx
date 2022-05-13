import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Badge, Box, Button, HStack, IconButton, Image, Text, VStack } from 'native-base'

const WishListCard = ({ image, name, price, discount, stock, id, handleClickDeleteWishlist, handleClickAddToCart }: any) => {
    const stars = [0, 1, 2, 3, 4]
    return (
        <Box shadow='4' rounded='md' p='3' backgroundColor='white'>
            <VStack space='4'>
                <HStack space='4'>
                    <Image rounded='sm' src={image} alt='image-item' w='20' style={{ aspectRatio: 1, resizeMode: 'cover' }} />
                    <VStack space='2'>
                        <Text fontSize='sm' pr='24'>{name}</Text>
                        <HStack space='2'>
                            <Text fontSize='md' fontWeight='bold' >{`Rp ${price - (price * discount / 100)}`}</Text>
                            {
                                discount > 0 &&
                                <HStack space='2' alignItems='center'>
                                    <Badge colorScheme='error' variant='solid' rounded='lg'>{`${discount}%`}</Badge>
                                    <Text fontSize='xs' textDecorationLine='line-through'>{`Rp ${price}`}</Text>
                                </HStack>
                            }
                        </HStack>
                        <HStack space='0.5'>
                            {
                                stars.map((_, idx) => (
                                    <Ionicons
                                        key={idx}
                                        name="star"
                                        size={15}
                                        color='#fde047'
                                    />
                                ))
                            }
                        </HStack>
                    </VStack>
                </HStack>
                <HStack w='full' space='3'>
                    <IconButton onPress={() => handleClickDeleteWishlist(id)} borderColor='blueGray.300' variant='outline' _icon={{
                        as: FontAwesome,
                        name: 'trash',
                        style: {
                            marginLeft: 4,
                            color: '#94a3b8'
                        }
                    }} />
                    <Button onPress={() => handleClickAddToCart(id)} flexGrow='1' variant='outline' colorScheme={stock > 0 ? 'tertiary' : 'blueGray'} borderColor={stock > 0 ? 'tertiary.500' : 'blueGray.400'}>
                        <HStack space='1' alignItems='center' justifyContent='center'>
                            <FontAwesome
                                name='plus'
                                color={stock > 0 ? '#10b981' : '#94a3b8'}
                                size={10}
                            />
                            <Text fontWeight='bold' color={stock > 0 ? 'tertiary.500' : 'blueGray.400'}>Keranjang</Text>
                        </HStack>
                    </Button>
                </HStack>
            </VStack>
        </Box>
    )
}

export default WishListCard