/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";
import NotFoundScreen from "../screens/NotFoundScreen";
import LoginScreen from "../screens/login/LoginScreen";
import {
  RootStackParamList,
  RootStackScreenProps,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import ProfileScreen from "../screens/profile/ProfileScreen";
import HomeScreen from "../screens/home/HomeScreen";
import RegisterScreen from "../screens/register/RegisterScreen";
import EditUserScreen from "../screens/edit-user/EditUserScreen";
import { Button, Flex, Input } from "native-base";
import WishListScreen from "../screens/wishlist/WishListScreen";
import DetailItemScreen from "../screens/detail-item/DetailItemScreen";
import CartIconSection from "../components/CartIcon";
import CartScreen from "../screens/cart/CartScreen";
import CheckoutScreen from "../screens/checkout/CheckoutScreen";
import { StackScreenStatusBarOptions } from "../libs/statusBar";
import OrderSuccessScreen from "../screens/order-success/OrderSuccessScreen";
import OrderDetailScreen from "../screens/order-detail/OrderDetailScreen";
import HistoryTransactionScreen from "../screens/history-transaction/HistoryTransactionScreen";
import useAuth from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { SET_SEARCH_KEYWORDS } from "../store/slicers/sellItems";
import { ROUTES_NAME } from "../libs/router";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Root'
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={({ navigation }: RootStackScreenProps<"Login">) =>
          StackScreenStatusBarOptions({ title: "Masuk" })
        }
      />
      <Stack.Screen
        name='Register'
        component={RegisterScreen}
        options={({ navigation }: RootStackScreenProps<"Register">) =>
          StackScreenStatusBarOptions({ title: "Buat Akun" })
        }
      />
      <Stack.Screen
        name='EditUser'
        component={EditUserScreen}
        options={({ navigation }: RootStackScreenProps<"EditUser">) =>
          StackScreenStatusBarOptions({})
        }
      />
      <Stack.Screen
        name='DetailItem'
        component={DetailItemScreen}
        options={({ navigation }: RootStackScreenProps<"DetailItem">) =>
          StackScreenStatusBarOptions({
            headerBackgroundColor: "#10b981",
            headerRight: () => <CartIconSection navigation={navigation} />,
          })
        }
      />
      <Stack.Screen
        name='Cart'
        component={CartScreen}
        options={({ navigation }: RootStackScreenProps<"Cart">) =>
          StackScreenStatusBarOptions({
            title: "Keranjang",
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate(ROUTES_NAME.WISHLIST)}>
                <Ionicons name='heart-outline' color='#fff' size={28} />
              </Pressable>
            ),
          })
        }
      />
      <Stack.Screen
        name='Checkout'
        component={CheckoutScreen}
        options={({ navigation }: RootStackScreenProps<"Checkout">) =>
          StackScreenStatusBarOptions({
            title: "Pengiriman",
          })
        }
      />
      <Stack.Screen
        name='OrderSuccess'
        component={OrderSuccessScreen}
        options={({ navigation }: RootStackScreenProps<"OrderSuccess">) =>
          StackScreenStatusBarOptions({
            title: "Sewa Barang Berhasil",
          })
        }
      />
      <Stack.Screen
        name='OrderDetail'
        component={OrderDetailScreen}
        options={({ navigation }: RootStackScreenProps<"OrderDetail">) =>
          StackScreenStatusBarOptions({
            title: "Detail Penyewaan",
          })
        }
      />
      <Stack.Screen
        name='HistoryTransaction'
        component={HistoryTransactionScreen}
        options={({ navigation }: RootStackScreenProps<"HistoryTransaction">) =>
          StackScreenStatusBarOptions({
            title: "Riwayat Transaksi",
          })
        }
      />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const { isLogin } = useAuth();
  const dispatch = useDispatch();
  const [keywords, setKeywords] = React.useState<string>("");
  const searchValue = useSelector(
    (state: RootState) => state.sellItems.searchKeywords,
  );

  const handleSearch = () => {
    dispatch(SET_SEARCH_KEYWORDS(keywords));
  };

  return (
    <BottomTab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarActiveTintColor: "#10b981",
        headerTintColor: "#10b981",
        tabBarStyle: {
          backgroundColor: "#fff",
        },
        headerStyle: {
          backgroundColor: "#fff",
        },
      }}>
      <BottomTab.Screen
        name='Home'
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<"Home">) => ({
          headerTintColor: "#fff",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#10b981",
          },
          headerTitleStyle: {
            display: "none",
          },
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='home' color={color} size={23} />
          ),
          headerRight: () => (
            <Flex
              justifyContent='space-between'
              flexDirection='row'
              alignItems='center'
              w='full'>
              <Input
                type='text'
                w='80%'
                defaultValue={keywords}
                name='search'
                placeholder='Cari tas mendaki...'
                value={keywords}
                onChangeText={(val) => setKeywords(val)}
                onSubmitEditing={handleSearch}
                InputLeftElement={
                  <Ionicons
                    name='search-outline'
                    size={20}
                    color='#fff'
                    style={{ marginLeft: 10 }}
                  />
                }
                variant='outline'
                borderColor='#fff'
                color='white'
                placeholderTextColor='#fff'
                _focus={{
                  borderColor: "#fff",
                }}
                h='4/5'
                my='auto'
              />
              <CartIconSection navigation={navigation} />
            </Flex>
          ),
        })}
      />
      <BottomTab.Screen
        name='WishList'
        component={WishListScreen}
        options={({ navigation }: RootTabScreenProps<"WishList">) => ({
          headerTitleStyle: {
            display: "none",
          },
          headerTintColor: "#fff",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#10b981",
          },
          tabBarLabel: "Wishlist",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='heart' color={color} size={23} />
          ),
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.goBack()}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <Ionicons
                name='arrow-back-outline'
                size={30}
                color='#fff'
                style={{ marginLeft: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name='Profile'
        component={ProfileScreen}
        options={({ navigation }: RootTabScreenProps<"Profile">) => ({
          headerTitleStyle: {
            display: "none",
          },
          headerTintColor: "#fff",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#10b981",
          },
          headerRightContainerStyle: {
            paddingRight: 20,
          },
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='user' color={color} size={23} />
          ),
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.goBack()}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <Ionicons
                name='arrow-back-outline'
                size={30}
                color='#fff'
                style={{ marginLeft: 15 }}
              />
            </Pressable>
          ),
          headerRight: () => {
            if (isLogin) {
              return (
                <Button
                  onPress={() =>
                    navigation.push(ROUTES_NAME.HISTORY_TRANSACTION)
                  }
                  size='sm'
                  variant='outline'
                  _text={{ color: "white", fontWeight: "bold" }}
                  borderColor='white'>
                  Riwayat transaksi
                </Button>
              );
            }
          },
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
