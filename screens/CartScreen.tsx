import { Box, HStack, ScrollView, Text, VStack, Image, Button, Checkbox, Pressable } from "native-base";
import { RootStackScreenProps } from "../types";
import useCartItems from "../hooks/useCartItems";
import CartItemCard from "../components/CartItemCard";

import EmptyCart from '../assets/images/empty-cart.png';
import useOrderItems from "../hooks/useOrderItems";
import { ICartItem } from "../libs/interfaces";


export default function CartScreen({ navigation }: RootStackScreenProps<'Cart'>) {

    const {
        cartItems,
        selectedItemsForOrder,
        itemsCount,
        cartItemsTotalPayment,

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

    const { setOrderItems } = useOrderItems();

    const handleChangeValue = (isChecked: boolean) => {
        if (isChecked) return selectAllItemsToSelectedItemForOrder();
        removeAllItemsFromSelectedItemForOrder();
    }

    const handlePressCheckout = () => {
        setOrderItems({ items: selectedItemsForOrder });
        navigation.navigate('Checkout');
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
                        <ScrollView key={selectedItemsForOrder} mb='20'>
                            <VStack>
                                {
                                    cartItems.map((item: ICartItem) => (
                                        <CartItemCard
                                            key={item.id}
                                            id={item.id}
                                            image={item.image}
                                            name={item.name}
                                            price={item.price}
                                            discount={item.discount}
                                            count={item.count}
                                            stock={item.stock}
                                            handleAddCartItemCount={addCartItemCount}
                                            handleSubtractCartItemCount={subtractCartItemCount}
                                            handleRemoveItemInCart={removeItemFromCart}
                                            handleSetCartItemCount={setCartItemCount}
                                            handleAddItemToSelectedItemForOrder={addItemToSelectedItemForOrder}
                                            handleRemoveItemFromSelectedItemForOrder={removeItemFromSelectedItemForOrder}
                                            isSelectedItemForOrderContainThisItem={isSelectedItemForOrderContainThisItem}
                                        />
                                    ))
                                }
                            </VStack>
                        </ScrollView>
                        <Box w='full' shadow='9' roundedTop='lg' px='4' py='2' h='16' backgroundColor='white' position='absolute' bottom='0'>
                            <HStack space='3' alignItems='center' justifyContent='space-between'>
                                <VStack space='1'>
                                    <Text fontSize='sm'>Total harga</Text>
                                    <Text fontSize='lg' lineHeight='xs' fontWeight='bold'>{`Rp ${cartItemsTotalPayment}`}</Text>
                                </VStack>
                                <Button onPress={handlePressCheckout} isDisabled={itemsCount <= 0} variant='solid' colorScheme='tertiary' _text={{ color: '#fff' }} rounded='lg' py='3' px='8'>
                                    {`Sewa  ( ${itemsCount} )`}
                                </Button>
                            </HStack>
                        </Box>
                    </Box>
            }
        </Box>
    )
}