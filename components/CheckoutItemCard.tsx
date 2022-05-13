
import { Box, HStack, Image, Text, VStack } from 'native-base'

const CheckoutItemCard = ({ image, name, price, discount, count, note }: any) => {

    return (
        <Box px='3' py='2' backgroundColor='white'>
            <VStack space='4'>
                <HStack space='4'>
                    <Image rounded='sm' src={image} alt='image-item' w='20' style={{ aspectRatio: 1, resizeMode: 'cover' }} />
                    <VStack space='2'>
                        <Text fontSize='sm' fontWeight='bold' pr='24'>{name}</Text>
                        <Text fontSize='xs' pr='24'>{`${count} barang`}</Text>
                        <HStack space='2'>
                            <Text fontSize='md' fontWeight='bold' >{`Rp ${price - (price * discount / 100)}`}</Text>
                            {
                                discount > 0 && <Text fontSize='xs' textDecorationLine='line-through'>{`Rp ${price}`}</Text>
                            }
                        </HStack>
                    </VStack>
                </HStack>
                {
                    note.length > 0 ?
                        <Text fontSize='xs'>{note}</Text>
                        :
                        null
                }
            </VStack>
        </Box>
    )
}

export default CheckoutItemCard