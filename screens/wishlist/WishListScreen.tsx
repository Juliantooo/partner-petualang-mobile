import {
  Box,
  Button,
  HStack,
  Image,
  ScrollView,
  Text,
  View,
  VStack,
} from "native-base";
import WishListCard from "./parts/WishListCard";
import { RootTabScreenProps } from "../../types";
import useWishlistItems from "../../hooks/useWishlistItems";
import emptyWishListImage from "../../assets/images/empty-wishlist.png";
import useCartItems from "../../hooks/useCartItems";
import notification from "../../libs/notification";
import useAuth from "../../hooks/useAuth";
import { ROUTES_NAME } from "../../libs/router";
import { IItem, IWishlistItem } from "../../libs/interfaces";
import { useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import SkeletonWishlistCard from "./parts/SkeletonWishlistCard";

export default function WishListScreen({
  navigation,
}: RootTabScreenProps<"WishList">) {
  const { isLogin } = useAuth();
  const { wishlistItems, wishlistItemsCount, removeItemFromWishlist } =
    useWishlistItems();
  const { addItemToCart, isItemAlreadyInCart, addCartItemCount } =
    useCartItems();
  const { userData } = useAuth();
  const { setWishListItems, isLoading } = useWishlistItems();

  const handleClickWishlistCard = (id: string) => {
    navigation.push(ROUTES_NAME.DETAIL_ITEM, { id });
  };

  const handleClickAddToCart = (id: string) => {
    if (!isLogin) {
      notification.error("Anda belum masuk ke akun anda!");
      return navigation.navigate(ROUTES_NAME.LOGIN);
    }
    const item: IWishlistItem = wishlistItems.find((item) => item.id === id)!;
    notification.success("Berhasil menambahkan ke keranjang");
    if (isItemAlreadyInCart(id)) return addCartItemCount(id);

    addItemToCart(item);
  };

  const WishlistScreenTitle = () => {
    return wishlistItemsCount > 0
      ? `${wishlistItemsCount} Barang Wishlist`
      : "";
  };

  return (
    <View flex='1' backgroundColor='#fff'>
      <ScrollView>
        <Box p='4'>
          <Text mb='5' fontWeight='bold' fontSize='lg'>
            {WishlistScreenTitle()}
          </Text>
          <VStack space='4'>
            {isLoading ? (
              <>
                <SkeletonWishlistCard />
                <SkeletonWishlistCard />
                <SkeletonWishlistCard />
                <SkeletonWishlistCard />
              </>
            ) : wishlistItems.length > 0 ? (
              wishlistItems.map((item: IItem) => (
                <WishListCard
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  discount={item.discount}
                  stock={item.stock}
                  handleClickWishlistCard={handleClickWishlistCard}
                  handleClickDeleteWishlist={removeItemFromWishlist}
                  handleClickAddToCart={handleClickAddToCart}
                />
              ))
            ) : (
              <>
                <HStack space='5' justifyContent='center' alignItems='center'>
                  <Image
                    ml='4'
                    alt='empty-cart-icon'
                    source={emptyWishListImage}
                    w='40'
                    style={{ aspectRatio: 1 }}
                  />
                  <VStack space='2' flexShrink='1'>
                    <Text fontSize='md' lineHeight='xs' fontWeight='bold'>
                      Wishlist
                    </Text>
                    <Text fontSize='sm' lineHeight='xs'>
                      Simpan dan bandingkan barang favoritmu cukup di satu
                      tempat.
                    </Text>
                  </VStack>
                </HStack>
                <Button
                  onPress={() => navigation.replace(ROUTES_NAME.ROOT)}
                  variant='solid'
                  backgroundColor='tertiary.500'
                  _text={{ color: "white", fontWeight: "bold" }}
                  rounded='md'
                  w='full'>
                  Cari Produk
                </Button>
              </>
            )}
          </VStack>
        </Box>
      </ScrollView>
    </View>
  );
}
