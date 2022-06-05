import { Box, HStack, ScrollView, Text, VStack } from "native-base";
import { useEffect, useState } from "react";
import useOrderItems from "../../hooks/useOrderItems";
import { IOrder } from "../../libs/interfaces";
import { getOrderStatusColor } from "../../libs/order";
import { RootStackScreenProps } from "../../types";

export default function OrderDetailScreen({
  route,
}: RootStackScreenProps<"OrderDetail">) {
  const { idOrder } = route.params;
  const { ordersHistory } = useOrderItems();

  const [detailOrder, setDetailOrder] = useState<IOrder>({});

  useEffect(() => {
    const order: IOrder = ordersHistory.find(
      (order: IOrder) => order.id === idOrder,
    );
    setDetailOrder(order);
  }, []);

  return (
    <Box flex='1' backgroundColor='blueGray.50' p='4'>
      {detailOrder ? (
        <ScrollView>
          <VStack space='2'>
            <Box flex='1' rounded='sm' p='2' backgroundColor='white'>
              <Text fontWeight='bold'>Waktu transaksi</Text>
              <Text>{detailOrder?.orderDate}</Text>
            </Box>
            <HStack justifyContent='space-between' space='2'>
              <Box flex='1' rounded='sm' p='2' backgroundColor='white'>
                <Text fontWeight='bold'>Nama</Text>
                <Text>{detailOrder?.user?.name}</Text>
              </Box>
              <Box flex='1' rounded='sm' p='2' backgroundColor='white'>
                <Text fontWeight='bold'>Email</Text>
                <Text>{detailOrder?.user?.email}</Text>
              </Box>
            </HStack>
            <HStack justifyContent='space-between' space='2'>
              <Box flex='1' rounded='sm' p='2' backgroundColor='white'>
                <Text fontWeight='bold'>No Hp</Text>
                <Text>{detailOrder?.user?.phone}</Text>
              </Box>
              <Box flex='1' rounded='sm' p='2' backgroundColor='white'>
                <Text fontWeight='bold'>Pengiriman</Text>
                <Text>{detailOrder?.deliveryMethod}</Text>
              </Box>
            </HStack>
            <HStack justifyContent='space-between' space='2'>
              <Box flex='1' rounded='sm' p='2' backgroundColor='white'>
                <Text fontWeight='bold'>Tanggal Sewa</Text>
                <Text>{detailOrder?.startRentDate}</Text>
              </Box>
              <Box flex='1' rounded='sm' p='2' backgroundColor='white'>
                <Text fontWeight='bold'>Tanggal Pengembalian</Text>
                <Text>{detailOrder?.endRentDate}</Text>
              </Box>
            </HStack>
            <HStack justifyContent='space-between' space='2'>
              <Box flex='1' rounded='sm' p='2' backgroundColor='white'>
                <Text fontWeight='bold'>{`Lama Sewa (Hari)`}</Text>
                <Text>{detailOrder?.daysOfRent}</Text>
              </Box>
              <Box flex='1' rounded='sm' p='2' backgroundColor='white'>
                <Text fontWeight='bold'>Diskon</Text>
                <Text>{detailOrder?.discountAmount}</Text>
              </Box>
            </HStack>
            <HStack justifyContent='space-between' space='2'>
              <Box flex='1' rounded='sm' p='2' backgroundColor='white'>
                <Text fontWeight='bold'>Total Pembayaran</Text>
                <Text>Rp {detailOrder?.totalPayment}</Text>
              </Box>
              <Box flex='1' rounded='sm' p='2' backgroundColor='white'>
                <Text fontWeight='bold'>Metode Pembayaran</Text>
                <Text>{detailOrder?.paymentMethod}</Text>
              </Box>
            </HStack>
            <Box rounded='sm' p='2' backgroundColor='white'>
              <Text fontWeight='bold'>Barang</Text>
              {detailOrder?.items?.map((item) => (
                <Box key={item.id}>
                  <Text>- {`${item.count} ${item.name}`}</Text>
                  {item.note ? (
                    <Text fontSize='xs'>{`Catatan : ${item.note}`}</Text>
                  ) : null}
                </Box>
              ))}
            </Box>

            <Box rounded='sm' p='2' backgroundColor='white'>
              <Text fontWeight='bold'>Alamat</Text>
              <Text>{detailOrder?.user?.address}</Text>
            </Box>
            <Box rounded='sm' p='2' backgroundColor='white'>
              <Text fontWeight='bold'>Status</Text>
              <Text
                color={getOrderStatusColor(detailOrder.status!)}
                fontWeight='bold'>
                {detailOrder?.status}
              </Text>
            </Box>
          </VStack>
        </ScrollView>
      ) : (
        <Text>Loading</Text>
      )}
    </Box>
  );
}
