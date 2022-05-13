import { Box, Text, VStack } from "native-base";
import { RootStackScreenProps } from "../types";
import useOrderItems from "../hooks/useOrderItems";
import CheckoutItemCard from "../components/CheckoutItemCard";

export default function CheckoutScreen({ navigation }: RootStackScreenProps<'Checkout'>) {

    const { orderItems } = useOrderItems();

    return (
        <Box flex='1' backgroundColor='blueGray.50'>
            {
                orderItems.length > 0 &&
                <VStack space='2' my='4' px='3'>
                    <Text fontSize='lg' fontWeight='bold'>List barang</Text>
                    {
                        orderItems.map((item) => (
                            <CheckoutItemCard
                                key={item.id}
                                image={item.image}
                                name={item.name}
                                price={item.price}
                                discount={item.discount}
                                count={item.count}
                                note={item.note}
                            />
                        ))
                    }
                </VStack>
            }
        </Box>
    )
}