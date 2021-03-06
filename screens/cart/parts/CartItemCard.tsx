import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  HStack,
  VStack,
  Image,
  Text,
  Badge,
  Pressable,
  useDisclose,
  Input,
  Checkbox,
  Flex,
  View,
  IconButton,
} from "native-base";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

interface ICartItemCardProps {
  id: string;
  image?: string;
  name: string;
  price: number;
  discount?: number;
  count?: number;
  stock?: number;
  note?: string;
  handleAddCartItemCount: (id: string) => void;
  handleSubtractCartItemCount: (id: string) => void;
  handleRemoveItemInCart: (id: string) => void;
  handleSetCartItemCount: (id: string, count: number) => void;
  handleAddItemToSelectedItemForOrder: (id: string) => void;
  handleRemoveItemFromSelectedItemForOrder: (id: string) => void;
  isSelectedItemForOrderContainThisItem: (id: string) => void;
  handleSetNote: (itemNote: string, id: string) => void;
}

const CartItemCard = ({
  id,
  image,
  name,
  price,
  discount,
  count,
  stock,
  note,
  handleAddCartItemCount,
  handleSubtractCartItemCount,
  handleRemoveItemInCart,
  handleSetCartItemCount,
  handleAddItemToSelectedItemForOrder,
  handleRemoveItemFromSelectedItemForOrder,
  isSelectedItemForOrderContainThisItem,
  handleSetNote,
}: ICartItemCardProps) => {
  const { isOpen, onClose, onOpen } = useDisclose();
  const [onFocus, setOnFocus] = useState<boolean>(false);
  const [value, setValue] = useState<number>(count);
  const [itemNote, setItemNote] = useState<string>("");

  const handleChange = (inputValue: string) => {
    const inputValueNumber = parseInt(inputValue, 10);
    if (!inputValueNumber) return setValue(0);
    if (inputValueNumber > stock) {
      setValue(stock);
      handleSetCartItemCount(id, stock);
    } else {
      setValue(inputValueNumber);
      handleSetCartItemCount(id, inputValueNumber);
    }
  };

  const handleBlur = () => {
    if (!value) setValue(count);
    setOnFocus(false);
  };
  const handleBlurInputNote = () => {
    handleSetNote(itemNote, id);
    onClose();
  };

  const handleChangeValue = (isChecked: boolean) => {
    if (isChecked) return handleAddItemToSelectedItemForOrder(id);
    handleRemoveItemFromSelectedItemForOrder(id);
  };

  useEffect(() => {
    setValue(count);
  }, [count]);

  return (
    <VStack space='4' py='3' px='5'>
      <HStack space='5' alignItems='center'>
        <Checkbox
          isChecked={isSelectedItemForOrderContainThisItem(id)}
          accessibilityLabel='select'
          onChange={(e) => handleChangeValue(e)}
        />
        <Image
          src={image}
          alt='image-product'
          w='16'
          style={{ aspectRatio: 1, resizeMode: "cover" }}
        />
        <VStack space='2' flexShrink='1'>
          <Text fontSize='md' isTruncated>
            {name}
          </Text>
          <HStack space='2' alignItems='center'>
            <Text fontWeight='bold' isTruncated>{`Rp ${
              price - price * (discount / 100)
            }`}</Text>
            {discount > 0 && (
              <HStack space='2'>
                <Badge
                  colorScheme='error'
                  variant='solid'
                  rounded='lg'>{`${discount}%`}</Badge>
                <Text fontSize='xs' textDecorationLine='line-through'>
                  Rp {price}
                </Text>
              </HStack>
            )}
          </HStack>
        </VStack>
      </HStack>
      {isOpen ? (
        <Box position='relative'>
          <View
            style={styles.floatingLabel}
            ml='3'
            px='0.5'
            backgroundColor='white'
            mb={-2}>
            <Text fontSize='xs'>Tulis catatan untuk barang ini</Text>
          </View>
          <Input
            onChangeText={(val) => setItemNote(val)}
            onBlur={handleBlurInputNote}
            defaultValue={note}
            value={itemNote}
            borderColor='tertiary.500'
            _focus={{
              borderColor: "tertiary.500",
              backgroundColor: "white",
            }}
            autoFocus
          />
        </Box>
      ) : (
        <Pressable onPress={() => onOpen()}>
          {note ? (
            <Text fontSize='xs'>{`Catatan : ${note}`}</Text>
          ) : (
            <Text fontSize='xs' color='tertiary.500'>
              Tulis Catatan
            </Text>
          )}
        </Pressable>
      )}
      <HStack space='5' alignSelf='flex-end' alignItems='center'>
        <Ionicons
          onPress={() => handleRemoveItemInCart(id)}
          name='trash-outline'
          color='#888'
          size={25}
        />
        <Flex
          direction='row'
          alignItems='center'
          h='10'
          w='32'
          borderColor={onFocus ? "tertiary.500" : "gray.400"}
          borderWidth={0.2}
          rounded='sm'>
          <IconButton
            onPress={() => handleSubtractCartItemCount(id)}
            variant='unstyled'
            _focus={{
              borderWidth: 0,
            }}
            icon={<Ionicons name='remove-outline' size={20} color='#888' />}
          />

          <Input
            h='full'
            textAlign='center'
            onFocus={() => setOnFocus(true)}
            onBlur={handleBlur}
            borderWidth='0'
            w='12'
            keyboardType='numeric'
            onChangeText={(e) => handleChange(e)}
            value={value.toString()}
          />

          <IconButton
            onPress={() => handleAddCartItemCount(id)}
            variant='unstyled'
            _focus={{
              borderWidth: 0,
            }}
            icon={<Ionicons name='add-outline' size={20} color='#10b981' />}
          />
        </Flex>
      </HStack>
    </VStack>
  );
};

const styles = StyleSheet.create({
  floatingLabel: {
    elevation: 999,
    alignSelf: "baseline",
  },
});

export default CartItemCard;
