import { Ionicons } from '@expo/vector-icons'
import { VStack, HStack, Text } from 'native-base'

const ReviewBox = () => {
    const stars = [0, 1, 2, 3, 4]
    return (
        <VStack space='1' backgroundColor='white' rounded='md' shadow='2' p='3' my='2'>
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
            <Text fontSize='xs' fontWeight='bold'>Hadi Jamal</Text>
            <Text fontSize='sm'>
                Pelayanan toko sangat memuaskan. Harga barang juga ok, murah tapi berkualitas... dan response admin juga menyenangkan, apalagi bisa diantar.
                Jadi senang sewa peralatan di sini
            </Text>
        </VStack>
    )
}

export default ReviewBox