import { Box, ScrollView, Text, VStack } from "native-base";
import useOrderItems from "../hooks/useOrderItems";
import { RootStackScreenProps } from "../types";


export default function OrderDetailScreen({ navigation }: RootStackScreenProps<'OrderDetail'>) {

    const { order } = useOrderItems();
    return (
        <Box flex='1' backgroundColor='blueGray.50' p='4'>
            <ScrollView>
                <VStack space='2'>
                    <Box rounded='sm' p='2' backgroundColor='white'>
                        <Text fontWeight='bold'>Nama</Text>
                        <Text>{order.user.name}</Text>
                    </Box>
                    <Box rounded='sm' p='2' backgroundColor='white'>
                        <Text fontWeight='bold'>Email</Text>
                        <Text>{order.user.email}</Text>
                    </Box>
                    <Box rounded='sm' p='2' backgroundColor='white'>
                        <Text fontWeight='bold'>No Hp</Text>
                        <Text>{order.user.phone}</Text>
                    </Box>
                    <Box rounded='sm' p='2' backgroundColor='white'>
                        <Text fontWeight='bold'>No Hp</Text>
                        <Text>{order.user.phone}</Text>
                    </Box>
                    <Box rounded='sm' p='2' backgroundColor='white'>
                        <Text fontWeight='bold'>Alamat</Text>
                        <Text>{order.user.address}</Text>
                    </Box>
                    <Box rounded='sm' p='2' backgroundColor='white'>
                        <Text fontWeight='bold'>Barang</Text>
                        {
                            order.items.map((item) => (
                                <Text key={item.id} fontWeight='semibold'>- {item.name}</Text>
                            ))
                        }
                    </Box>
                    <Box rounded='sm' p='2' backgroundColor='white'>
                        <Text fontWeight='bold'>Pengiriman</Text>
                        <Text>{order.deliveryMethod}</Text>
                    </Box>
                    <Box rounded='sm' p='2' backgroundColor='white'>
                        <Text fontWeight='bold'>Diskon</Text>
                        <Text>Rp {order.discountAmount}</Text>
                    </Box>
                    <Box rounded='sm' p='2' backgroundColor='white'>
                        <Text fontWeight='bold'>Total Pembayaran</Text>
                        <Text>Rp {order.totalPayment}</Text>
                    </Box>
                    <Box rounded='sm' p='2' backgroundColor='white'>
                        <Text fontWeight='bold'>Metode Pembayaran</Text>
                        <Text>{order.paymentMethod}</Text>
                    </Box>
                    <Box rounded='sm' p='2' backgroundColor='white'>
                        <Text fontWeight='bold'>Status</Text>
                        <Text color='blue.300' fontWeight='bold'>{order.status}</Text>
                    </Box>
                </VStack>
            </ScrollView>
        </Box>
    )
}