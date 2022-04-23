
import { MaterialIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import { Box, Button, FormControl, HStack, Icon, Input, Stack, Text, VStack, WarningOutlineIcon } from 'native-base';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { IAuthFormProps } from '../libs/interfaces';


export default function AuthForm({ initialValues, atuhValidationSchema, handleClickChangeAuth, handleSubmit, title, actionText }: IAuthFormProps) {

    const [show, setShow] = useState<boolean>(false);

    return (
        <Formik
            validationSchema={atuhValidationSchema}
            initialValues={initialValues}
            onSubmit={(values, actions) => {
                handleSubmit(values, actions)
            }}>
            {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                isValid,
                isSubmitting,
                touched
            }) => (
                <VStack space='3' width='100%'>
                    <HStack alignItems='center' justifyContent='space-between' width='100%'>
                        <Text fontSize='2xl'>{title}</Text>
                        <TouchableOpacity onPress={handleClickChangeAuth}>
                            <Text fontSize='md' color='tertiary.500'>{actionText}</Text>
                        </TouchableOpacity>
                    </HStack>
                    <Box alignItems="center">
                        <Box w="100%">
                            <FormControl isRequired isInvalid={errors.email?.length > 0}>
                                <Stack >
                                    <FormControl.Label>Email</FormControl.Label>
                                    <Input type='text' defaultValue="" name='email' placeholder="Email address" value={values.email} keyboardType='email-address' onBlur={handleBlur('email')} onChangeText={handleChange('email')} />
                                    {
                                        errors.email && touched.email ?
                                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                                {errors.email}
                                            </FormControl.ErrorMessage>
                                            : null
                                    }
                                </Stack>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box alignItems="center" width='100%'>
                        <Box w="100%">
                            <FormControl isRequired isInvalid={errors.password?.length > 0}>
                                <Stack >
                                    <FormControl.Label>Password</FormControl.Label>
                                    <Input
                                        type={show ? 'text' : 'password'}
                                        defaultValue=""
                                        secureTextEntry={!show}
                                        name='password'
                                        placeholder="password"
                                        value={values.password}
                                        onBlur={handleBlur('password')}
                                        onChangeText={handleChange('password')}
                                        InputRightElement={
                                            <Icon as={
                                                <MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="3" color="muted.400" onPress={() => setShow(!show)
                                                }
                                            />
                                        }
                                    />
                                    {
                                        errors.password && touched.password ?
                                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                                {errors.password}
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
                        colorScheme='tertiary' _text={{ fontSize: 15, fontWeight: 'bold' }}>Masuk</Button>
                </VStack>
            )}
        </Formik>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});