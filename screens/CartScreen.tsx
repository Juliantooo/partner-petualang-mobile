import { Box, HStack, ScrollView, Text, VStack, Image, Button, Checkbox, Pressable, useDisclose } from "native-base";
import { RootStackScreenProps } from "../types";
import useCartItems from "../hooks/useCartItems";
import CartItemCard from "../components/CartItemCard";
import DatePicker from 'react-native-datepicker';
import EmptyCart from '../assets/images/empty-cart.png';
import useOrderItems from "../hooks/useOrderItems";
import { ICartItem } from "../libs/interfaces";
import { useState } from "react";
import dayjs from 'dayjs'
import { StyleSheet } from "react-native";

const TODAY = dayjs().format('DD-MM-YYYY');
export default function CartScreen({ navigation }: RootStackScreenProps<'Cart'>) {

    const {
        cartItems,
        selectedItemsForOrder,
        itemsCount,
        cartItemsTotalPayment,

        setCartItems,
        subtractCartItemCount,
        addCartItemCount,
        removeItemFromCart,
        setCartItemCount,
        addItemToSelectedItemForOrder,
        removeItemFromSelectedItemForOrder,
        selectAllItemsToSelectedItemForOrder,
        removeAllItemsFromSelectedItemForOrder,
        isSelectedItemForOrderContainThisItem
    } = useCartItems();

    const { setOrderItems, startRentDate, setStartRentDate, setEndRentDate, daysOfRent, endRentDate, setOrder } = useOrderItems();

    const handleChangeValue = (isChecked: boolean) => {
        if (isChecked) return selectAllItemsToSelectedItemForOrder();
        removeAllItemsFromSelectedItemForOrder();
    }

    const handlePressCheckout = () => {
        setOrderItems({ items: selectedItemsForOrder, isShowNotification: false });
        const order = {
            startRentDate,
            endRentDate,
            daysOfRent,
        }
        setOrder(order);
        navigation.navigate('Checkout');
    }

    const handleSetNote = (note: string, idItem: string) => {
        const item = cartItems.find((cartItem: ICartItem) => cartItem.id === idItem);
        const idxItem = cartItems.findIndex((cartItem: ICartItem) => cartItem.id === idItem);
        const newCartItem = { ...item, note }
        const newCartItems: ICartItem[] = [...cartItems]
        newCartItems.splice(idxItem, 1, newCartItem)
        setCartItems(newCartItems)
    }


    return (
        <Box flex='1' background='white'>
            {
                cartItems.length === 0 ?
                    <VStack space='5' p='5' mt='8'>
                        <HStack space='5' justifyContent='center' alignItems='center'>
                            <Image ml='4' alt='empty-cart-icon' source={EmptyCart} w='40' style={{ aspectRatio: 1 }} />
                            <VStack space='2' flexShrink='1'>
                                <Text fontSize='md' lineHeight='xs' fontWeight='bold'>Wah, keranjang belanjaanmu kosong</Text>
                                <Text fontSize='sm' lineHeight='xs' >Yuk, isi dengan barang-barang impianmu</Text>
                            </VStack>
                        </HStack>
                        <Button onPress={() => navigation.replace('Root')} variant='solid' backgroundColor='tertiary.500' _text={{ color: 'white', fontWeight: 'bold' }} rounded='md' w='full'>Mulai Belanja</Button>
                    </VStack>
                    :
                    <Box flex='1'>
                        <HStack px='5' py='4' justifyContent='space-between' alignItems='center' >
                            <Checkbox isChecked={selectedItemsForOrder.length === cartItems.length} onChange={(e) => handleChangeValue(e)}>
                                <Text fontSize='sm'>
                                    Pilih semua
                                </Text>
                            </Checkbox>
                            <Pressable>
                                <Text fontSize='md' fontWeight='bold' color='tertiary.500'>Hapus</Text>
                            </Pressable>
                        </HStack>
                        <ScrollView key={selectedItemsForOrder.length} mb='32'>
                            <VStack>
                                {
                                    cartItems.map((item: ICartItem) => (
                                        <CartItemCard
                                            key={item.id}
                                            id={item.id!}
                                            image={item.image}
                                            name={item.name!}
                                            price={item.price!}
                                            discount={item.discount}
                                            count={item.count}
                                            stock={item.stock}
                                            note={item.note}
                                            handleAddCartItemCount={addCartItemCount}
                                            handleSubtractCartItemCount={subtractCartItemCount}
                                            handleRemoveItemInCart={removeItemFromCart}
                                            handleSetCartItemCount={setCartItemCount}
                                            handleAddItemToSelectedItemForOrder={addItemToSelectedItemForOrder}
                                            handleRemoveItemFromSelectedItemForOrder={removeItemFromSelectedItemForOrder}
                                            isSelectedItemForOrderContainThisItem={isSelectedItemForOrderContainThisItem}
                                            handleSetNote={handleSetNote}
                                        />
                                    ))
                                }
                            </VStack>
                        </ScrollView>
                        <VStack w='full' shadow='9' roundedTop='lg' px='4' py='2' backgroundColor='white' position='absolute' bottom='0'>
                            <HStack py='1' space='5' alignItems='center' justifyContent='space-between'>
                                <DatePicker
                                    mode="date" //The enum of date, datetime and time
                                    placeholder="Tanggal Pinjam"
                                    format="DD-MM-YYYY"
                                    date={startRentDate}
                                    minDate={TODAY}
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    showIcon={false}
                                    customStyles={{
                                        dateInput: {
                                            borderWidth: 0,
                                        },
                                        dateText: {
                                            color: '#fff'
                                        },
                                        placeholderText: {
                                            color: '#fff'
                                        },
                                        dateTouchBody: {
                                            backgroundColor: '#10b981',
                                            borderRadius: 5,
                                        }
                                    }}
                                    onDateChange={(date: string) => {
                                        setStartRentDate(date);
                                    }}
                                />
                                <Text fontSize='lg' fontWeight='bold'>
                                    {`${daysOfRent} Hari`}
                                </Text>
                                <DatePicker
                                    mode="date" //The enum of date, datetime and time
                                    placeholder="Tanggal Kembali"
                                    format="DD-MM-YYYY"
                                    date={endRentDate}
                                    disabled={!startRentDate}
                                    minDate={startRentDate}
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    showIcon={false}
                                    customStyles={{
                                        dateInput: {
                                            borderWidth: 0,
                                        },
                                        dateText: {
                                            color: '#fff'
                                        },
                                        placeholderText: {
                                            color: '#fff'
                                        },
                                        dateTouchBody: {
                                            backgroundColor: '#10b981',
                                            borderRadius: 5,
                                        },
                                        disabled: {
                                            borderRadius: 5,
                                        }
                                    }}
                                    onDateChange={(date: string) => {
                                        setEndRentDate(date);
                                    }}
                                />
                            </HStack>
                            <HStack py='1' space='3' alignItems='center' justifyContent='space-between'>
                                <VStack space='1'>
                                    <Text fontSize='sm'>Total harga</Text>
                                    <Text fontSize='lg' lineHeight='xs' fontWeight='bold'>{`Rp ${cartItemsTotalPayment * daysOfRent}`}</Text>
                                </VStack>
                                <Button onPress={handlePressCheckout} isDisabled={itemsCount <= 0 || daysOfRent === 0} variant='solid' colorScheme='tertiary' _text={{ color: '#fff' }} rounded='lg' py='3' px='8'>
                                    {`Sewa  ( ${itemsCount} )`}
                                </Button>
                            </HStack>
                        </VStack>
                    </Box>
            }
        </Box>
    )
}