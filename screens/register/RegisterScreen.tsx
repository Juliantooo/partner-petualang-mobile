import { StyleSheet } from "react-native";
import { View } from "../../components/Themed";
import useAuth from "../../hooks/useAuth";
import { atuhValidationSchema } from "../../libs/validation";
import { RootStackScreenProps } from "../../types";
import AuthForm from "../../components/AuthForm";
import { IAuthValues } from "../../libs/interfaces";
import { ROUTES_NAME } from "../../libs/router";
import { FormikHelpers } from "formik";
import { authRegister } from "../../services/user";
import notification from "../../libs/notification";

const FORM_HEADER = {
  title: "Daftar",
  action: "Masuk",
};
const REGISTER_SUCCESS_MESSAGE = "Berhasil mendaftarkan akun baru!";
const REGISTER_ERROR_MESSAGE = "Gagal mendaftarkan akun baru!";

export default function RegisterScreen({
  navigation,
}: RootStackScreenProps<"Register">) {
  const { authValues } = useAuth();

  const handleClickChangeAuth = () => {
    navigation.navigate(ROUTES_NAME.LOGIN);
  };

  const handleSubmit = async (
    values: IAuthValues,
    actions: FormikHelpers<any>,
  ) => {
    await authRegister({ email: values.email, password: values.password })
      .catch(() => {
        actions.setSubmitting(false);
        notification.error(REGISTER_ERROR_MESSAGE);
      })
      .finally(() => {
        actions.setSubmitting(false);
        actions.resetForm();
      });

    notification.success(REGISTER_SUCCESS_MESSAGE);
  };

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: "10%",
  },
});
