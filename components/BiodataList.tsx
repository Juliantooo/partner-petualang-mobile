import { FontAwesome } from "@expo/vector-icons";
import { Box, HStack, VStack, Text, ScrollView } from "native-base";
import { TouchableOpacity } from "react-native";
import useAuth from "../hooks/useAuth";
import { ROUTES_NAME } from "../libs/router";
import { MaterialIcons } from '@expo/vector-icons';

export default function BiodataList({ userData, navigation, handleLogout }: any) {

    const { isLogin } = useAuth()

    return (
        <ScrollView >
            <Box px="4" pb="12" pt='4'>
                {
                    userData.length > 0 && userData.map((user: any) => {
                        if (user) {
                            return (
                                <Box borderBottomWidth="1" _dark={{
                                    borderColor: "muted.50"
                                }} borderColor="muted.800" key={user.key} pl="4" pr="5" py="2">
                                    <TouchableOpacity onPress={() => isLogin && navigation.navigate(ROUTES_NAME.EDIT_USER, { data: user })}>
                                        <HStack space='5' justifyContent="space-between" alignItems='center'>
                                            <VStack w='85%'>
                                                <Text _dark={{
                                                    color: "warmGray.50"
                                                }} color="coolGray.800" bold>
                                                    {user.key}
                                                </Text>
                                                {
                                                    user.key === 'image' ?
                                                        <Text color="coolGray.600" _dark={{
                                                            color: "warmGray.200"
                                                        }}>
                                                            {user.value ? <FontAwesome
                                                                name='check'
                                                                color='#10b981'
                                                                size={20}
                                                            />
                                                                : '-'}
                                                        </Text>
                                                        :
                                                        <Text color="coolGray.600" _dark={{
                                                            color: "warmGray.200"
                                                        }}>
                                                            {user.value ? user.value : '-'}
                                                        </Text>
                                                }
                                            </VStack>
                                            <FontAwesome
                                                name='chevron-right'
                                                size={20}
                                            />
                                        </HStack>
                                    </TouchableOpacity>
                                </Box>
                            )
                        }
                    })
                }
                {
                    isLogin &&
                    <Box borderBottomWidth="1" _dark={{
                        borderColor: "muted.50"
                    }} borderColor="muted.800" pl="4" pr="5" py="2">
                        <TouchableOpacity onPress={handleLogout}>
                            <HStack space='5' justifyContent="space-between" alignItems='center'>
                                <VStack w='85%'>
                                    <Text _dark={{
                                        color: "warmGray.50"
                                    }} color="coolGray.800" bold>
                                        Logout
                                    </Text>
                                    <Text color="danger.500" _dark={{
                                        color: "warmGray.200"
                                    }}>
                                        Keluar dari akun anda.
                                    </Text>
                                </VStack>
                                <MaterialIcons name="logout" size={23} color='#f43f5e' />
                            </HStack>
                        </TouchableOpacity>
                    </Box>
                }
            </Box>
        </ScrollView>
    );
}