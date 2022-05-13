import { Center, VStack, Skeleton } from "native-base";


const SkeletonCard = () => {
    return (
        <Center w='48' rounded='lg' shadow='6' backgroundColor='white' my='4'>
            <VStack w="100%" maxW="400" borderWidth="1" pb='4' space={8} overflow="hidden" rounded="md" _dark={{
                borderColor: "coolGray.500"
            }} _light={{
                borderColor: "coolGray.200"
            }}>
                <Skeleton h="40" />
                <Skeleton.Text px="4" />
            </VStack>
        </Center>
    )
}

export default SkeletonCard