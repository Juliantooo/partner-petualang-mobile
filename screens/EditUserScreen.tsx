import { Formik } from "formik";
import { Avatar, Box, Button, FormControl, Image, Input, Stack, Text, VStack, WarningOutlineIcon } from "native-base";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { View } from "../components/Themed";
import useAuth from "../hooks/useAuth";
import { updateUser } from "../services/user";
import { SET_USER_DATA } from "../store/slicers/user";
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from "react";
import { uploadAvatarProfile } from "../services/extras";
import notification from "../libs/notification";



export default function ({ navigation, route }: any) {

    const [loadingUploadImage, setLoadingUploadImage] = useState<boolean>(false)
    const { idUser } = useAuth();
    const dispatch = useDispatch();
    const { data } = route.params;

    const [image, setImage] = useState<string>('')

    const initialValues = {
        [data.key]: data.value
    }

    const handleSubmit = async (values: string, action: any) => {
        const response: any = await updateUser(values, idUser)
        const { id, password, email, address, name, phone, image } = response
        notification.success(`Berhasil update profile`);
        dispatch(SET_USER_DATA({ id, password, email, address, name, phone, image }))
        action.setSubmitting(false)
        action.resetForm()
        navigation.goBack()
    }


    const handleOpenLibrary = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });


        if (!result.cancelled) {
            setImage(result.uri);
        }
    }

    const handleUploadImage = async () => {
        setLoadingUploadImage(true)
        const responseUriImg = await uploadAvatarProfile(image, idUser)
        const values = {
            image: responseUriImg
        }
        const responseUserData = await updateUser(values, idUser);
        notification.success(`Berhasil update profile`);
        dispatch(SET_USER_DATA(responseUserData))
        setLoadingUploadImage(false)
        navigation.goBack()
    }

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);


    if (data.key === 'image') {
        return (
            <View style={styles.container}>
                <Avatar
                    bg="gray.400"
                    mx='auto'
                    mt='5'
                    source={{
                        uri: image ? image : data.value
                    }}
                    size="xl">
                    ?
                </Avatar>
                {
                    image ?
                        <Button variant='solid' size='md' colorSchema='primary' w='32' mx='auto' mt='5' onPress={handleUploadImage}>Ubah foto</Button>
                        :
                        <Button variant='solid' size='md' isLoading={loadingUploadImage} colorSchema='primary' w='32' mx='auto' mt='5' onPress={handleOpenLibrary}>Pilih foto</Button>
                }
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <Text fontSize='lg' fontWeight='bold'>{data.key}</Text>
                <Formik
                    validationSchema={data.validationSchema}
                    initialValues={initialValues}
                    enableReinitialize
                    onSubmit={(values, actions) => {
                        handleSubmit(values, actions)
                    }}>
                    {({
                        handleBlur,
                        handleSubmit,
                        handleChange,
                        values,
                        errors,
                        isValid,
                        isSubmitting,
                    }) => (
                        <VStack space='3' width='100%'>
                            <Box alignItems="center">
                                <Box w="100%">
                                    <FormControl isRequired isInvalid={errors[data.key]}>
                                        <Stack>
                                            <FormControl.Label>{data.key}</FormControl.Label>
                                            <Input type={data.field.type}
                                                defaultValue={data.value}
                                                name={data.key}
                                                placeholder={data.key}
                                                value={values}
                                                keyboardType={data.field.keyType}
                                                onBlur={handleBlur(data.key)}
                                                onChangeText={handleChange(data.key)}
                                            />
                                            {
                                                errors[data.key] ?
                                                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                                        {errors[data.key]}
                                                    </FormControl.ErrorMessage>
                                                    : null
                                            }
                                        </Stack>
                                    </FormControl>
                                </Box>
                            </Box>
                            <Button
                                onPress={handleSubmit}
                                isLoading={isSubmitting}
                                mt='5'
                                isDisabled={!isValid}
                                colorScheme='tertiary' _text={{ fontSize: 15, fontWeight: 'bold' }}>{data.value ? 'Edit' : 'Tambah'}</Button>
                        </VStack>
                    )}
                </Formik>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: '10%'
    },
});
