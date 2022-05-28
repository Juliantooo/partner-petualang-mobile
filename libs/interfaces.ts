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
export interface IItem {
    id?: string,
    category?: string,
    description?: string,
    discount?: number,
    image?: string,
    name?: string,
    price?: number,
    rented?: number,
    stock?: number,
}

export type IWishlistItem = IItem

export interface ICartItem extends IItem {
    note?: string,
    count?: number
}

export type IOrderItem = ICartItem

export interface IUser {
    address?: string,
    email?: string,
    id?: string,
    image?: string,
    name?: string,
    password?: string,
    phone?: string,
}

export interface IOrder {
    id?: string,
    deliveryMethod?: string,
    paymentMethod?: string,
    status?: string,
    discountAmount?: number,
    totalPayment?: number,
    user?: IUser,
    items?: Array<IOrderItem>,
    startRentDate?: string,
    endRentDate?: string,
    daysOfRent?: number,
    orderDate?: string
}


