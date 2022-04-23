import { FormikHelpers } from 'formik';
import { StyleSheet } from 'react-native';
import AuthForm from '../components/AuthForm';
import { View } from '../components/Themed';
import useAuth from '../hooks/useAuth';
import { IAuthValues } from '../libs/interfaces';
import { ROUTES_NAME } from '../libs/router';
import { atuhValidationSchema } from '../libs/validation';
import { RootStackScreenProps } from '../types';

const FORM_HEADER = {
    title: 'Masuk',
    action: 'Daftar'
}

export default function LoginScreen({ navigation }: RootStackScreenProps<'Login'>) {

    const { authValues } = useAuth()

    const handleClickChangeAuth = () => {
        navigation.navigate(ROUTES_NAME.REGISTER)
    }

    const handleSubmit = (values: IAuthValues, actions: FormikHelpers<any>) => {
        console.log(values)
        setTimeout(() => {
            actions.setSubmitting(false)
        }, 2000);
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
