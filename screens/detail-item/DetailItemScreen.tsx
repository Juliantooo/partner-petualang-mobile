import { FontAwesome, Ionicons } from "@expo/vector-icons";
import {
  Box,
  Button,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import ReviewBox from "../../components/ReviewBox";
import useAuth from "../../hooks/useAuth";
import useCartItems from "../../hooks/useCartItems";
import useWishlistItems from "../../hooks/useWishlistItems";
import { IItem } from "../../libs/interfaces";
import notification from "../../libs/notification";
import { ROUTES_NAME } from "../../libs/router";
import { RootState } from "../../store";
import { RootStackScreenProps } from "../../types";

export default function DetailItemScreen({
  navigation,
  route,
}: RootStackScreenProps<"DetailItem">) {
  const items = useSelector((state: RootState) => state.sellItems.sellItems);
  const { addItemToCart, isItemAlreadyInCart, addCartItemCount } =
    useCartItems();
  const { isLogin } = useAuth();
  const { addItemToWishlist, removeItemFromWishlist, isWishlistItem } =
    useWishlistItems();
  const [detailItem, setDetailItem] = useState<IItem>({});
  const { id } = route.params;

  const getDetailItem = () => {
    const item = items.find((itemData: IItem) => itemData.id === id)!;
    setDetailItem(item);
  };

  const handlePressWishListIcon = () => {
    if (!isLogin) {
      notification.error("Anda belum masuk ke akun anda!");
      return navigation.navigate(ROUTES_NAME.LOGIN);
    }
    if (isWishlistItem(id)) return removeItemFromWishlist(id);
    addItemToWishlist(detailItem);
  };

  const handlePressAddItemToCart = () => {
    if (!isLogin) {
      notification.error("Anda belum masuk ke akun anda!");
      return navigation.navigate(ROUTES_NAME.LOGIN);
    }
    if (isItemAlreadyInCart(id)) return addCartItemCount(id);
    addItemToCart(detailItem);
  };

  const handlePressBuyNow = () => {
    if (!isLogin) {
      notification.error("Anda belum masuk ke akun anda!");
      return navigation.navigate(ROUTES_NAME.LOGIN);
    }

    if (isItemAlreadyInCart(id)) {
      addCartItemCount(id);
      notification.success(`Berhasil menambahkan ke keranjang`);
    } else {
      addItemToCart(detailItem);
    }

    navigation.navigate(ROUTES_NAME.CART);
  };

  useEffect(() => {
    getDetailItem();
  }, [detailItem]);

  return (
    <Box backgroundColor='blueGray.200' flex='1'>
      <ScrollView>
        <VStack>
          <Image
            w='full'
            style={{ aspectRatio: 1, resizeMode: "cover" }}
            src={detailItem.image ? detailItem.image : ""}
            alt='item-picture'
          />
          <Box px='4' pt='4' pb='6' backgroundColor='white'>
            <HStack justifyContent='space-between' alignItems='center'>
              <Text
                fontSize='2xl'
                fontWeight='bold'>{`Rp ${detailItem.price}`}</Text>
              <TouchableOpacity onPress={handlePressWishListIcon}>
                <Ionicons
                  name={isWishlistItem(id) ? "heart" : "heart-outline"}
                  size={30}
                  color={isWishlistItem(id) ? "#ec4899" : "#888"}
                />
              </TouchableOpacity>
            </HStack>
            <Text fontSize='md'>{detailItem.name}</Text>
            <HStack space='5' alignItems='center'>
              <Text fontSize='xs'>{`Tersewa ${detailItem.rented} kali`}</Text>
              <Text fontSize='xs'>{`Tersisa ${detailItem.stock}`}</Text>
              <HStack
                space='2'
                borderWidth='1'
                py='0.5'
                px='1'
                rounded='md'
                borderColor='gray.200'>
                <Ionicons name='star' size={15} color='#fde047' />
                <Text fontSize='xs'>4.5</Text>
              </HStack>
            </HStack>
            <Box mt='4' backgroundColor='white'>
              <Text fontSize='md' fontWeight='bold'>
                Deskripsi Produk
              </Text>
              <Text fontSize='sm'>{detailItem.description || "-"}</Text>
            </Box>
          </Box>
        </VStack>
        <Box px='4' pt='4' pb='20' backgroundColor='white'>
          {/* <Text fontSize='md' fontWeight='bold'>
            Ulasan Produk
          </Text>
          <ReviewBox />
          <ReviewBox /> */}
        </Box>
      </ScrollView>
      <Box
        w='full'
        shadow='9'
        roundedTop='md'
        p='2'
        h='16'
        backgroundColor='white'
        position='absolute'
        bottom='0'>
        <HStack space='3' alignItems='center'>
          <Button
            onPress={handlePressBuyNow}
            flexGrow='1'
            variant='outline'
            borderColor='tertiary.500'
            _text={{ color: "tertiary.500", fontWeight: "bold" }}>
            Beli Langung
          </Button>
          <Pressable
            onPress={handlePressAddItemToCart}
            flexGrow='1'
            backgroundColor='tertiary.500'
            p='2.5'
            rounded='sm'>
            <HStack space='1' alignItems='center' justifyContent='center'>
              <FontAwesome name='plus' color='#fff' size={10} />
              <Text fontWeight='bold' color='#fff'>
                Keranjang
              </Text>
            </HStack>
          </Pressable>
        </HStack>
      </Box>
    </Box>
  );
}
