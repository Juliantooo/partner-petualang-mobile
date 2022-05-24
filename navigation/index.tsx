/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import LoginScreen from '../screens/LoginScreen';
import { RootStackParamList, RootStackScreenProps, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import EditUserScreen from '../screens/EditUserScreen';
import { Box, Flex, HStack, Input, InputGroup, InputLeftAddon, Stack as NativeBaseStack } from 'native-base';
import WishListScreen from '../screens/WishListScreen';
import DetailItemScreen from '../screens/DetailItemScreen';
import CartIconSection from '../components/CartIcon';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import { StackScreenStatusBarOptions } from '../libs/statusBar';
import OrderSuccessScreen from '../screens/OrderSuccessScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="Login" component={LoginScreen}
        options={({ navigation }: RootStackScreenProps<'Login'>) => (StackScreenStatusBarOptions({ title: 'Masuk' }))}
      />
      <Stack.Screen name="Register" component={RegisterScreen}
        options={({ navigation }: RootStackScreenProps<'Register'>) => (StackScreenStatusBarOptions({ title: 'Buat Akun' }))}
      />
      <Stack.Screen name="EditUser" component={EditUserScreen}
        options={({ navigation }: RootStackScreenProps<'EditUser'>) => (StackScreenStatusBarOptions({}))}
      />
      <Stack.Screen name="DetailItem" component={DetailItemScreen}
        options={({ navigation }: RootStackScreenProps<'DetailItem'>) => (StackScreenStatusBarOptions(
          {
            headerBackgroundColor: '#10b981',
            headerRight: () => (
              <CartIconSection navigation={navigation} />
            ),
          }
        ))} />
      <Stack.Screen name="Cart" component={CartScreen} options={({ navigation }: RootStackScreenProps<'Cart'>) => (StackScreenStatusBarOptions({
        title: 'Keranjang',
        headerRight: () => (
          <Pressable onPress={() => navigation.navigate('WishList')}>
            <Ionicons
              name='heart-outline'
              color='#fff'
              size={28}
            />
          </Pressable>
        )
      }))} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={({ navigation }: RootStackScreenProps<'Checkout'>) => (StackScreenStatusBarOptions({
        title: 'Pengiriman'
      }))} />
      <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} options={({ navigation }: RootStackScreenProps<'OrderSuccess'>) => (StackScreenStatusBarOptions({
        title: 'Sewa Barang Berhasil'
      }))} />
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} options={({ navigation }: RootStackScreenProps<'OrderDetail'>) => (StackScreenStatusBarOptions({
        title: 'Detail Penyewaan'
      }))} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#10b981',
        headerTintColor: '#10b981',
        tabBarStyle: {
          backgroundColor: '#fff',
        },
        headerStyle: {
          backgroundColor: '#fff',
        }
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          headerTintColor: '#fff',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#10b981',
          },
          headerTitleStyle: {
            display: 'none'
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} size={23} />,
          headerRight: () => (
            <Flex justifyContent='space-between' flexDirection='row' alignItems='center' w='full'>
              <Input
                type='text'
                w='80%'
                defaultValue=""
                name='search'
                placeholder="Cari tas mendaki..."
                value=''
                InputLeftElement={
                  <Ionicons
                    name="search-outline"
                    size={20}
                    color='#fff'
                    style={{ marginLeft: 10 }}
                  />
                }
                variant='outline'
                borderColor='#fff'
                placeholderTextColor='#fff'
                _focus={{
                  borderColor: '#fff'
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
        name="WishList"
        component={WishListScreen}
        options={({ navigation }: RootTabScreenProps<'WishList'>) => ({
          headerTitleStyle: {
            display: 'none'
          },
          headerTintColor: '#fff',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#10b981',
          },
          tabBarLabel: 'Wishlist',
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} size={23} />,
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.goBack()}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <Ionicons
                name="arrow-back-outline"
                size={30}
                color='#fff'
                style={{ marginLeft: 15 }}
              />
            </Pressable>
          )
        })}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }: RootTabScreenProps<'Profile'>) => ({
          headerTitleStyle: {
            display: 'none'
          },
          headerTintColor: '#fff',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#10b981',
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} size={23} />,
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.goBack()}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <Ionicons
                name="arrow-back-outline"
                size={30}
                color='#fff'
                style={{ marginLeft: 15 }}
              />
            </Pressable>
          )
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
