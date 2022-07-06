import { FormikHelpers } from "formik";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import AuthForm from "../../components/AuthForm";
import { View } from "../../components/Themed";
import useAuth from "../../hooks/useAuth";
import useOrderItems from "../../hooks/useOrderItems";
import useSellItems from "../../hooks/useSellItems";
import {
  IAuthValues,
  IItem,
  IUser,
  IWishlistItem,
} from "../../libs/interfaces";
import notification from "../../libs/notification";
import { ROUTES_NAME } from "../../libs/router";
import { atuhValidationSchema } from "../../libs/validation";
import { authLogin, getUserData } from "../../services/user";
import { SET_CART_ITEMS } from "../../store/slicers/cartItems";
import { SET_AUTH_TOKEN, SET_USER_DATA } from "../../store/slicers/user";
import { SET_WISH_LIST_ITEMS } from "../../store/slicers/whishlist";
import { RootStackScreenProps } from "../../types";

const FORM_HEADER = {
  title: "Masuk",
  action: "Daftar",
};

const LOGIN_SUCCESS_MESSAGE = "Berhasil Masuk Ke Akun!";
const LOGIN_ERROR_MESSAGE = "Periksa kembali email atau password anda!";

export default function LoginScreen({
  navigation,
}: RootStackScreenProps<"Login">) {
  const { authValues } = useAuth();
  const dispatch = useDispatch();
  const { items } = useSellItems();
  const { setOrdersHistory } = useOrderItems();

  const handleClickChangeAuth = () => {
    navigation.navigate(ROUTES_NAME.REGISTER);
  };

  const handleSubmit = async (
    values: IAuthValues,
    actions: FormikHelpers<any>,
  ) => {
    const response: any = await authLogin({
      email: values.email,
      password: values.password,
    }).catch(() => {
      actions.setSubmitting(false);
      notification.error(LOGIN_ERROR_MESSAGE);
    });

    const userData: any = await getUserData(response.uid).finally(() => {
      actions.setSubmitting(false);
      actions.resetForm();
    });

    if (Object.keys(userData).length > 0) {
      const user: IUser = {
        email: userData.email,
        password: userData.password,
        id: userData.id,
        address: userData.address,
        name: userData.name,
        phone: userData.phone,
        image: userData.image,
      };

      dispatch(SET_AUTH_TOKEN(response.stsTokenManager.accessToken));
      dispatch(SET_USER_DATA(user));

      if (userData.cartItems) dispatch(SET_CART_ITEMS(userData.cartItems));

      if (userData.wishlistItems?.length > 0) {
        const wishlistItems: Array<IWishlistItem> = userData.wishlistItems.map(
          (wishlistItem: IWishlistItem) => {
            const sellItem: IItem = items.find(
              (item: IItem) => item.id === wishlistItem.id,
            );
            return {
              ...wishlistItem,
              stock: sellItem.stock,
            };
          },
        );
        dispatch(SET_WISH_LIST_ITEMS(wishlistItems));
      }

      if (userData.ordersHistory) {
        setOrdersHistory(userData.ordersHistory);
      }

      notification.success(LOGIN_SUCCESS_MESSAGE);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <AuthForm
        title={FORM_HEADER.title}
        actionText={FORM_HEADER.action}
        initialValues={authValues}
        atuhValidationSchema={atuhValidationSchema}
        handleClickChangeAuth={handleClickChangeAuth}
        handleSubmit={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: "10%",
  },
});
