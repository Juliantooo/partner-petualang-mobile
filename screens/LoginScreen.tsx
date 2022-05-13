import { FormikHelpers } from 'formik';
import { useDisclose } from 'native-base';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import AuthForm from '../components/AuthForm';
import { View } from '../components/Themed';
import useAuth from '../hooks/useAuth';
import { IAuthValues } from '../libs/interfaces';
import notification from '../libs/notification';
import { ROUTES_NAME } from '../libs/router';
import { atuhValidationSchema } from '../libs/validation';
import { authLogin, getUserData } from '../services/user';
import { SET_AUTH_TOKEN, SET_USER_DATA } from '../store/slicers/user';
import { RootStackScreenProps } from '../types';

const FORM_HEADER = {
    title: 'Masuk',
    action: 'Daftar'
}

const LOGIN_SUCCESS_MESSAGE = 'Berhasil Masuk Ke Akun!';
const LOGIN_ERROR_MESSAGE = 'Periksa kembali email atau password anda!';

export default function LoginScreen({ navigation }: RootStackScreenProps<'Login'>) {

    const { authValues } = useAuth()
    const dispatch = useDispatch()

    const handleClickChangeAuth = () => {
        navigation.navigate(ROUTES_NAME.REGISTER)
    }

    const handleSubmit = async (values: IAuthValues, actions: FormikHelpers<any>) => {
        const response = await authLogin({ email: values.email, password: values.password }).catch(() => {
            actions.setSubmitting(false);
            notification.error(LOGIN_ERROR_MESSAGE);
        })

        const userData = await getUserData(response.uid)
            .finally(() => {
                actions.setSubmitting(false)
                actions.resetForm()
            })

        if (Object.keys(userData).length > 0) {
            dispatch(SET_AUTH_TOKEN(response.stsTokenManager.accessToken));
            dispatch(SET_USER_DATA(userData));
            notification.success('Berhasil masuk ke akun!')
            navigation.goBack();
        }
    }

    return (
        <View style={styles.container}>
            <AuthForm
                title={FORM_HEADER.title}
                actionText={FORM_HEADER.action}
                initialValues={authValues}
                atuhValidationSchema={atuhValidationSchema}
                handleClickChangeAuth={handleClickChangeAuth}
                handleSubmit={handleSubmit}
            />
        </View >
    );
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
