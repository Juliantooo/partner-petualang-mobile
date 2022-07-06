import { Box, HStack, Skeleton, VStack } from "native-base";

const SkeletonWishlistCard = () => {
  return (
    <Box shadow='4' rounded='md' p='3' backgroundColor='white'>
      <VStack space='4'>
        <HStack space='3'>
          <Skeleton h='20' w='20' />
          <Skeleton.Text />
        </HStack>
        <HStack space='3' w='full'>
          <Skeleton h='10' w='12' />
          <Skeleton h='10' w='20' flexGrow='1' />
        </HStack>
      </VStack>
    </Box>
  );
};

export default SkeletonWishlistCard;
