import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import useAuth from '../hooks/useAuth';
import { atuhValidationSchema } from '../libs/validation';
import { RootStackScreenProps } from '../types';
import AuthForm from '../components/AuthForm';
import { IAuthValues } from '../libs/interfaces';
import { ROUTES_NAME } from '../libs/router';
import { FormikHelpers } from 'formik';
import { useDisclose } from 'native-base';
import Notification from '../components/Notification';
import { statusNotification } from '../libs/notification';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const FORM_HEADER = {
    title: 'Daftar',
    action: 'Masuk'
}
const REGISTER_SUCCESS_MESSAGE = 'Berhasil mendaftarkan akun baru!'

export default function RegisterScreen({ navigation }: RootStackScreenProps<'Register'>) {

    const { authValues } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclose()

    const handleClickChangeAuth = () => {
        navigation.navigate(ROUTES_NAME.LOGIN);
    }

    const handleSubmit = async (values: IAuthValues, actions: FormikHelpers<any>) => {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential: any) => {
                console.log(userCredential)
                const user = userCredential.user
                console.log(user)
                onOpen()
            }).catch(() => {
                actions.setSubmitting(false)
            })
            .finally(() => {
                actions.setSubmitting(false)
                actions.resetForm()
            })
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
            {
                isOpen &&
                <Notification
                    status={statusNotification.SUCCESS}
                    text={REGISTER_SUCCESS_MESSAGE}
                    isOpen={isOpen}
                    onClose={onClose}
                />
            }
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
