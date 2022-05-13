import { FormikHelpers } from "formik";
import { RootTabScreenProps } from "../types";

export interface IAuthValues {
    email?: string,
    password?: string,
}

export interface IAuthFormProps {
    initialValues: IAuthValues,
    atuhValidationSchema: unknown,
    handleClickChangeAuth: () => void,
    handleSubmit: (initialValues: IAuthValues, actions: FormikHelpers<any>) => void,
    title: string,
    actionText: string
}

export interface INotificationProps {
    status: string,
    text: string,
    isOpen: boolean,
    onClose: () => void
}

export interface IUserDataProps extends IAuthValues {
    name: string,
    id: string,
    phone: string,
    address: string,
    image: string,
    navigation: RootTabScreenProps<'Profile'>
}
export interface IUserData extends IAuthValues {
    name: string,
    id: string,
    phone: string,
    address: string,
    image: string,
}