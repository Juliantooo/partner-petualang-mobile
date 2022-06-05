import { Badge, Box, Pressable } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import useCartItems from "../hooks/useCartItems";
import useAuth from "../hooks/useAuth";
import { ROUTES_NAME } from "../libs/router";
import notification from "../libs/notification";

const CartSection = ({ navigation }: any) => {
  const { isLogin } = useAuth();
  const { cartItemsCount } = useCartItems();

  const handlePressGoToCart = () => {
    if (!isLogin) {
      notification.error("Anda belum masuk ke akun anda!");
      return navigation.navigate(ROUTES_NAME.LOGIN);
    }
    navigation.navigate(ROUTES_NAME.CART);
  };

  return (
    <Box marginRight='26'>
      {cartItemsCount ? (
        <Badge
          colorScheme='danger'
          rounded='lg'
          mb={-4}
          mr={-3}
          zIndex={1}
          variant='solid'
          alignSelf='flex-end'
          _text={{
            fontSize: 9,
            mb: 0.5,
          }}>
          {cartItemsCount}
        </Badge>
      ) : null}
      <Pressable onPress={handlePressGoToCart}>
        <Ionicons name='cart-outline' size={25} color='#fff' />
      </Pressable>
    </Box>
  );
};

export default CartSection;
