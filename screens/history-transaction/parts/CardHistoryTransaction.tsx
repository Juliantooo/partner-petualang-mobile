import {
  Badge,
  Box,
  Button,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { IOrderItem } from "../../../libs/interfaces";
import { getOrderStatusColor, ORDER_STATUS } from "../../../libs/order";

interface ICardHistoryTransactionProps {
  idOrder: string;
  orderDate: string;
  status: string;
  items: IOrderItem[];
  totalPayment: number;
  handleClickBuyAgain: () => void;
  handleClickGoToDetailTransaction: (idOrder: string) => void;
}

const CardHistoryTransaction = ({
  idOrder,
  orderDate,
  status,
  items,
  totalPayment,
  handleClickBuyAgain,
  handleClickGoToDetailTransaction,
}: ICardHistoryTransactionProps) => {
  return (
    <Box p='2' rounded='md' borderWidth='1' borderColor='gray.200'>
      <VStack space='2'>
        <HStack justifyContent='space-between' alignItems='center'>
          <Box>
            <Text fontSize='xs' fontWeight='bold'>
              Tanggal
            </Text>
            <Text fontSize='xs'>{orderDate || "-"}</Text>
          </Box>
          <Badge
            backgroundColor={getOrderStatusColor(status)}
            rounded='sm'
            _text={{
              color: "white",
            }}>
            {status}
          </Badge>
        </HStack>
        <Pressable onPress={() => handleClickGoToDetailTransaction(idOrder)}>
          <VStack>
            {items.map((item: IOrderItem) => (
              <HStack key={item.id} space='2' px='1'>
                <Image
                  h='12'
                  style={{ aspectRatio: 1, resizeMode: "cover" }}
                  alt='product-picture'
                  src={item.image}
                />
                <Box>
                  <Text fontSize='sm' fontWeight='bold' isTruncated>
                    {item.name}
                  </Text>
                  <Text
                    fontSize='xs'
                    isTruncated>{`${item.count} Barang`}</Text>
                </Box>
              </HStack>
            ))}
          </VStack>
        </Pressable>
        <HStack justifyContent='space-between' alignItems='flex-end'>
          <Box>
            <Text fontSize='xs'>Total Belanja</Text>
            <Text fontSize='xs' fontWeight='bold'>{`Rp ${totalPayment}`}</Text>
          </Box>
          {status === ORDER_STATUS.PROCESSED ||
          status === ORDER_STATUS.RENTED ? null : (
            <Button
              onPress={() => handleClickBuyAgain()}
              size='xs'
              px='8'
              backgroundColor='tertiary.500'
              _text={{ color: "white", fontWeight: "bold" }}>
              Beli Lagi
            </Button>
          )}
        </HStack>
      </VStack>
    </Box>
  );
};

export default CardHistoryTransaction;
