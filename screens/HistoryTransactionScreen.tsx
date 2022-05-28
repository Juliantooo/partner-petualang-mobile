import { Badge, Box, Button, HStack, Image, ScrollView, Text, VStack } from "native-base";
import CardHistoryTransaction from "../components/CardHistoryTransaction";
import useOrderItems from "../hooks/useOrderItems";
import { IOrder } from "../libs/interfaces";
import { ROUTES_NAME } from "../libs/router";
import { RootStackScreenProps } from "../types";
import EmptyHistoryTransaction from '../assets/images/empty-history-transaction.png';


export default function HistoryTransactionScreen({ navigation }: RootStackScreenProps<'HistoryTransaction'>) {

    const { ordersHistory } = useOrderItems();

    const handleClickBuyAgain = () => {
        navigation.navigate(ROUTES_NAME.HOME);
    }

    const handleClickGoToDetailTransaction = (idOrder: string) => {
        navigation.navigate('OrderDetail', { idOrder });
    }

    return (
        <Box flex='1' backgroundColor='white'>
            <ScrollView>
                {
                    ordersHistory.length > 0 ?
                        <VStack space='3' p='3'>
                            {
                                ordersHistory.map((order: IOrder, idx: number) => (
                                    <CardHistoryTransaction
                                        key={idx}
                                        idOrder={order.id!}
                                        orderDate={order.orderDate!}
                                        status={order.status!}
                                        items={order.items!}
                                        totalPayment={order.totalPayment!}
                                        handleClickBuyAgain={handleClickBuyAgain}
                                        handleClickGoToDetailTransaction={handleClickGoToDetailTransaction}
                                    />
                                ))
                            }
                        </VStack>
                        :
                        <Box>
                            <VStack space='5' p='5' mt='8'>
                                <HStack space='5' justifyContent='center' alignItems='center'>
                                    <Image ml='4' alt='empty-cart-icon' source={EmptyHistoryTransaction} w='40' style={{ aspectRatio: 1 }} />
                                    <VStack space='2' flexShrink='1'>
                                        <Text fontSize='md' lineHeight='xs' fontWeight='bold'>Wah, Riwayat belanjaanmu masih kosong</Text>
                                        <Text fontSize='sm' lineHeight='xs' >Yuk, Mulai sewa peralatan untuk menemani kegiatanmu</Text>
                                    </VStack>
                                </HStack>
                                <Button onPress={() => navigation.navigate(ROUTES_NAME.HOME)} variant='solid' backgroundColor='tertiary.500' _text={{ color: 'white', fontWeight: 'bold' }} rounded='md' w='full'>Mulai Belanja</Button>
                            </VStack>
                        </Box>
                }
            </ScrollView>
        </Box>
    )
}