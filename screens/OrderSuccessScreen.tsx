import { Box, Text, Image, HStack, Button, VStack } from "native-base";
import { RootStackScreenProps } from "../types";
import useOrderItems from "../hooks/useOrderItems";
import { ROUTES_NAME } from "../libs/router";

import OrderSuccessIcon from '../assets/images/order-success.png'

export default function OrderSuccessScreen({ navigation }: RootStackScreenProps<'OrderSuccess'>) {

    const { order } = useOrderItems();

    return (
        <Box flex='1' display='flex' justifyContent='center' alignItems='center' backgroundColor='blueGray.50' p='4'>
            <VStack space='1'>
                <Image source={OrderSuccessIcon} alt='order-success-icon' style={{ aspectRatio: 1 }} h='64' mx='auto' />
                <Text textAlign='center' fontSize='xl' fontWeight='bold' color='gray.800'>Sewa Barang Berhasil Dilakukan!</Text>
                {
                    order.deliveryMethod === 'Delivery' ?
                        <Text textAlign='center' color='gray.800'>Sekarang, kamu hanya perlu menunggu barangmu dihantar dan menyelesaikan pembayaran.</Text>
                        :
                        <Text textAlign='center' color='gray.800'>Sekarang, kamu hanya perlu mengambil barangmu dan menyelesaikan pembayaran.</Text>
                }
                <Button mt='5' variant='solid' _text={{ fontWeight: 'bold' }} backgroundColor='tertiary.500' color='white' px='4' onPress={() => navigation.navigate(ROUTES_NAME.HOME)}>
                    Belanja Lagi
                </Button>
                <Button mt='2' variant='outline' borderColor='tertiary.500' _text={{ fontWeight: 'bold', color: 'tertiary.500' }} backgroundColor='white' px='4' onPress={() => navigation.navigate('OrderDetail')}>
                    Lihat Detail Order
                </Button>
            </VStack>
        </Box>
    )
}