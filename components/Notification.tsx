
import { Alert, CloseIcon, HStack, IconButton, Text, VStack } from "native-base";
import { useEffect } from "react";
import { INotificationProps } from "../libs/interfaces";

const Notification = ({ status, text, isOpen, onClose }: INotificationProps) => {

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                onClose()
            }, 4500);
        }
    }, [isOpen])

    return (
        <Alert w="100%" status={status} display='flex' alignItems='center' position='absolute' top='5'>
            <VStack space={2} flexShrink={1} w="100%">
                <HStack flexShrink={1} space={2} justifyContent="space-between">
                    <HStack space={2} flexShrink={1}>
                        <Alert.Icon mt="1" />
                        <Text fontSize="md" color="coolGray.800">
                            {text}
                        </Text>
                    </HStack>
                    <IconButton onPress={onClose} variant="unstyled" _focus={{
                        borderWidth: 0
                    }} icon={<CloseIcon size="3" color="coolGray.600" />} />
                </HStack>
            </VStack>
        </Alert>
    )
}

export default Notification