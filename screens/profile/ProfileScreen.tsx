import {
  Avatar,
  VStack,
  Text,
  Button,
  AlertDialog,
  useDisclose,
} from "native-base";
import { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import BiodataList from "./parts/BiodataList";
import { View } from "../../components/Themed";
import useAuth from "../../hooks/useAuth";
import notification from "../../libs/notification";
import { ROUTES_NAME } from "../../libs/router";
import { userDataValidationSchema } from "../../libs/validation";
import { userLogout } from "../../services/user";
import { SET_CART_ITEMS } from "../../store/slicers/cartItems";
import { SET_ORDER_HISTORY } from "../../store/slicers/orderItems";
import { SET_AUTH_TOKEN, SET_USER_DATA } from "../../store/slicers/user";
import { SET_WISH_LIST_ITEMS } from "../../store/slicers/whishlist";
import { RootTabScreenProps } from "../../types";

export default function ProfileScreen({
  navigation,
}: RootTabScreenProps<"Profile">) {
  const { isLogin, userData } = useAuth();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclose();

  const cancelRef = useRef<null>(null);
  const [mapUserData, setMapUserData] = useState<any>([]);
  const [isLoadingLogout, setIsLoadingLogout] = useState<boolean>(false);

  const handleClickLogout = () => {
    onOpen();
  };

  const handleLogout = async () => {
    setIsLoadingLogout(true);
    const isSuccessLogout = await userLogout();

    dispatch(
      SET_USER_DATA({
        email: "",
        password: "",
        id: "",
        address: "",
        name: "",
        phone: "",
        image: "",
      }),
    );
    dispatch(SET_AUTH_TOKEN(""));
    dispatch(SET_CART_ITEMS([]));
    dispatch(SET_WISH_LIST_ITEMS([]));
    dispatch(SET_ORDER_HISTORY([]));
    notification.success(`Berhasil keluar dari akun`);
    setIsLoadingLogout(false);
    onClose();
    if (isSuccessLogout) return navigation.navigate(ROUTES_NAME.LOGIN);
  };

  useEffect(() => {
    const newUserData = Object.entries(userData)
      .map((data) => {
        const newData = {
          key: data[0],
          value: data[1],
          validationSchema: userDataValidationSchema[data[0]],
          field: {
            type: data[0] === "image" ? "file" : "text",
            keyType: data[0] === "email" ? "email-address" : "default",
          },
        };
        return newData;
      })
      .filter(
        (data) =>
          data?.key !== "password" &&
          data?.key !== "email" &&
          data?.key !== "id",
      );

    setMapUserData(newUserData);
  }, [userData]);

  return (
    <View style={styles.container}>
      <VStack
        space='5'
        w='full'
        h='1/3'
        mb='5'
        position='relative'
        backgroundColor='tertiary.500'
        borderBottomRadius='3xl'>
        {isLogin ? (
          <>
            <Avatar
              key={userData.image}
              bg='gray.400'
              mx='auto'
              mt='5'
              source={{
                uri: userData.image,
              }}
              size='xl'>
              ?
            </Avatar>
            <VStack space='1' mx='auto'>
              <Text
                fontSize='lg'
                textAlign='center'
                fontWeight='bold'
                color='#fff'>
                {userData.name || "---"}
              </Text>
              <Text textAlign='center' color='#fff'>
                {userData.email}
              </Text>
            </VStack>
          </>
        ) : (
          <VStack my='12'>
            <Text
              fontSize='lg'
              textAlign='center'
              fontWeight='bold'
              color='#e11d48'>
              Anda Belum Login!
            </Text>
            <Text textAlign='center' color='#fff'>
              Silahkan login terlebih dahulu
            </Text>
            <Button
              variant='solid'
              size='md'
              colorSchema='primary'
              w='32'
              mx='auto'
              mt='5'
              onPress={() => navigation.navigate(ROUTES_NAME.LOGIN)}>
              Login
            </Button>
          </VStack>
        )}
      </VStack>
      <BiodataList
        userData={mapUserData}
        navigation={navigation}
        handleClickLogout={handleClickLogout}
        key={userData.email}
      />
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header
            py='3'
            _text={{ fontWeight: "bold", fontSize: 20 }}>
            Keluar
          </AlertDialog.Header>
          <AlertDialog.Body py='10'>
            Apakah anda yakin akan keluar dari akun?
          </AlertDialog.Body>
          <AlertDialog.Footer py='3'>
            <Button.Group space='6'>
              <Button
                variant='outline'
                colorScheme='tertiary'
                borderColor='tertiary.500'
                px='5'
                _text={{ fontWeight: "bold" }}
                ref={cancelRef}
                onPress={onClose}>
                Batal
              </Button>
              <Button
                px={isLoadingLogout ? "7" : "5"}
                isLoading={isLoadingLogout}
                backgroundColor='danger.500'
                _text={{ color: "white", fontWeight: "bold" }}
                onPress={handleLogout}>
                Keluar
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
