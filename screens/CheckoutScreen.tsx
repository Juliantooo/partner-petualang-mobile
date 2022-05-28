import { Actionsheet, Box, Button, HStack, Pressable, ScrollView, Text, VStack } from "native-base";
import { RootStackScreenProps } from "../types";
import useOrderItems from "../hooks/useOrderItems";
import CheckoutItemCard from "../components/CheckoutItemCard";
import useAuth from "../hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { handleOrderItems } from "../services/order";
import useLoading from "../hooks/useLoading";
import notification from "../libs/notification";
import { ICartItem, IOrder, IOrderItem } from "../libs/interfaces";
import useCartItems from "../hooks/useCartItems";
import { updateOrdersHistoryUser } from "../services/user";
import dayjs from "dayjs";

const DELIVERY = 'Delivery';
const DELIVERY_FEE = 7000;

export default function CheckoutScreen({ navigation }: RootStackScreenProps<'Checkout'>) {

    const { cartItems, setCartItems } = useCartItems();
    const { orderItems, setOrderItems, setOrder, ordersHistory, setOrdersHistory, order } = useOrderItems();
    const { userData } = useAuth();
    const { isLoading, setIsLoading } = useLoading();

    const deliveryMethodOptions = ['Ambil Sendiri', 'Delivery'];
    const [deliveryMethod, setDeliveryMethod] = useState<string>(deliveryMethodOptions[0]);
    const [openDeliveryMethodSheet, setOpenDeliveryMethodSheet] = useState<boolean>(false);

    const paymentMethodOptions = ['COD (Bayar di tempat)'];
    const [paymentMethod, setPaymentMethod] = useState<string>(paymentMethodOptions[0]);
    const [openPaymentMethodSheet, setOpenPaymentMethodSheet] = useState<boolean>(false);

    const [totalPayment, setTotalPayment] = useState<number>(0);
    const [totalDiscount, setTotalDiscount] = useState<number>(0);

    const handleSelectDeliveryOption = (deliveryOption: string) => {
        setDeliveryMethod(deliveryOption);
        setOpenDeliveryMethodSheet(false);
    }
    const handleSelectPaymentOption = (peymentOption: string) => {
        setPaymentMethod(peymentOption);
        setOpenPaymentMethodSheet(false);
    }

    const calculateTotalPayment = () => {
        const payment = orderItems.reduce((result: number, item: IOrderItem) => result + (item.count! * item.price! * order.daysOfRent), 0);
        const discount = orderItems.reduce((result: number, item: IOrderItem) => (result + (item.price! * item.count! * (item.discount! / 100))), 0);
        setTotalDiscount(discount);
        if (deliveryMethod === DELIVERY) {
            setTotalPayment(payment + DELIVERY_FEE - discount)
        } else {
            setTotalPayment(payment - discount)
        }
    }

    const handlePressOrder = async () => {
        setIsLoading(true)
        const orderData: IOrder = {
            id: `${userData.id}-${dayjs().format('DD-MM-YYYY-HH-mm')}`,
            user: userData,
            items: orderItems,
            discountAmount: totalDiscount,
            totalPayment,
            status: 'Diproses',
            paymentMethod,
            deliveryMethod,
            daysOfRent: order.daysOfRent,
            startRentDate: order.startRentDate,
            endRentDate: order.endRentDate,
            orderDate: dayjs().format('DD-MM-YYYY HH:mm')
        }
        await handleOrderItems(orderData).then(() => {
            setOrder(orderData);
            const arrayOfIdOrderItems: Array<string> = orderItems.map((item: IOrderItem) => item.id);
            const newCartItems: Array<ICartItem> = cartItems.filter((item: ICartItem) => !arrayOfIdOrderItems.includes(item.id!));
            setOrderItems({ items: [], isShowNotification: false });
            notification.success('Berhasil sewa barang!');
            setCartItems(newCartItems);
            const newOrdersHistory = [...ordersHistory, orderData];
            setOrdersHistory(newOrdersHistory);
            updateOrdersHistoryUser(newOrdersHistory, userData.id!);
            navigation.replace('OrderSuccess');
        }).catch(() => {
            notification.error('Gagal sewa barang!, Silahkan coba lagi.')
        }).finally(() => {
            setIsLoading(false)
        });
    }

    useEffect(() => {
        calculateTotalPayment();
    }, [deliveryMethod]);


    return (
        <Box flex='1' backgroundColor='blueGray.100'>
            <ScrollView>

                <Box rounded='lg' mt='4' mb='1' borderWidth='0' px='3' >
                    <Text fontSize='lg' fontWeight='bold' mb='1'>Daftar barang</Text>
                    {
                        orderItems.length > 0 &&
                        <VStack space='2' >
                            {
                                orderItems.map((item: ICartItem) => (
                                    <CheckoutItemCard
                                        key={item.id}
                                        image={item.image}
                                        name={item.name}
                                        price={item.price}
                                        discount={item.discount}
                                        count={item.count}
                                        note={item.note}
                                    />
                                ))
                            }
                        </VStack>
                    }
                </Box>
                <Box rounded='lg' borderWidth='0' my='1' px='3' >
                    <Text fontSize='lg' fontWeight='bold' mb='1'>Alamat</Text>
                    {
                        userData.address && userData.name && userData.phone ?
                            <VStack space='1' px='3' py='2' backgroundColor='white' rounded='sm'>
                                <Text fontSize='xs'>{`${userData.name} ( ${userData.phone} )`}</Text>
                                <Text fontSize='xs'>{userData.address}</Text>
                            </VStack>
                            :
                            <Button onPress={() => navigation.navigate('Profile')} backgroundColor='tertiary.500' _text={{ fontWeight: 'bold' }}>
                                Lengkapi Profile
                            </Button>
                    }
                </Box>
                {
                    userData.address && userData.name && userData.phone ?
                        null
                        :
                        <Text px='4' fontWeight='thin' fontSize='10' color='danger.500'>
                            *Data profile anda belum lengkap! Untuk bertransaksi, data seperti Nama, Nomor Hp, dan Alamat diperlukan.
                        </Text>
                }
                <Box rounded='lg' borderWidth='0' my='1' px='3' >
                    <Text fontSize='lg' fontWeight='bold' mb='1'>Pengiriman</Text>
                    <Pressable onPress={() => setOpenDeliveryMethodSheet(true)} >
                        <HStack backgroundColor='white' h='12' justifyContent='space-between' px='3' alignItems='center'>
                            <Text fontWeight='bold'>{deliveryMethod}</Text>
                            <Ionicons name={openDeliveryMethodSheet ? 'chevron-up-outline' : 'chevron-down-outline'} size={20} />
                        </HStack>
                    </Pressable>
                </Box>
                {
                    deliveryMethod === DELIVERY &&
                    <Text px='4' fontWeight='thin' fontSize='10' color='danger.500'>
                        *Opsi pengiriman "Delivery" akan dikenakan biaya tambahan sebesar Rp 7.000. Dan akan mulai dikirmkan setiap hari pukul 3 sore.
                    </Text>
                }
                <Box rounded='lg' borderWidth='0' my='1' px='3' >
                    <Text fontSize='lg' fontWeight='bold' mb='1'>Pengiriman</Text>
                    <Pressable onPress={() => setOpenPaymentMethodSheet(true)} >
                        <HStack backgroundColor='white' h='12' justifyContent='space-between' px='3' alignItems='center'>
                            <Text fontWeight='bold'>{paymentMethod}</Text>
                            <Ionicons name={openPaymentMethodSheet ? 'chevron-up-outline' : 'chevron-down-outline'} size={20} />
                        </HStack>
                    </Pressable>
                </Box>
                <Actionsheet isOpen={openDeliveryMethodSheet} onClose={() => setOpenDeliveryMethodSheet(false)}>
                    <Actionsheet.Content>
                        <Box w="100%" h={60} px={4} justifyContent="center">
                            <Text fontSize="16" color="gray.500" fontWeight='bold'>
                                Metode Pengiriman
                            </Text>
                        </Box>
                        {
                            deliveryMethodOptions.map((deliveryOption: string) => (
                                <Actionsheet.Item key={deliveryOption} onPress={() => handleSelectDeliveryOption(deliveryOption)}>{deliveryOption}</Actionsheet.Item>
                            ))
                        }
                    </Actionsheet.Content>
                </Actionsheet>

                <Actionsheet isOpen={openPaymentMethodSheet} onClose={() => setOpenPaymentMethodSheet(false)}>
                    <Actionsheet.Content>
                        <Box w="100%" h={60} px={4} justifyContent="center">
                            <Text fontSize="16" color="gray.500" fontWeight='bold'>
                                Metode Pembayaran
                            </Text>
                        </Box>
                        {
                            paymentMethodOptions.map((paymentOption: string) => (
                                <Actionsheet.Item key={paymentOption} onPress={() => handleSelectPaymentOption(paymentOption)}>{paymentOption}</Actionsheet.Item>
                            ))
                        }
                    </Actionsheet.Content>
                </Actionsheet>
            </ScrollView>
            <Box w='full' shadow='9' roundedTop='lg' px='4' py='2.5' h='16' backgroundColor='white' position='absolute' bottom='0'>
                <HStack space='3' alignItems='center' justifyContent='space-between'>
                    <VStack space='1'>
                        <Text fontSize='sm'>Total Pembayaran</Text>
                        <Text fontSize='lg' lineHeight='xs' fontWeight='bold'>{`Rp ${totalPayment}`}</Text>
                    </VStack>
                    <Button isDisabled={!userData.address || !userData.name || !userData.phone} isLoading={isLoading} onPress={handlePressOrder} variant='solid' colorScheme='tertiary' _text={{ color: '#fff' }} rounded='lg' py='3' px='8'>
                        {`Sewa`}
                    </Button>
                </HStack>
            </Box>
        </Box>
    )
}