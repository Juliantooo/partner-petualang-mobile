import { FormikHelpers } from "formik";

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