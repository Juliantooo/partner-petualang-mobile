import * as yup from 'yup'

export const atuhValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter valid email")
        .required('Email Address is Required'),
    password: yup
        .string()
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
})


export const userDataValidationSchema = {
    name: yup.object().shape({
        name: yup.string().required('Name is required').min(5)
    }),
    address: yup.object().shape({
        address: yup.string().required('Address is required').min(20)
    }),
    phone: yup.object().shape({
        phone: yup.string().required('Phone is required').min(9).max(14)
    }),
    image: yup.object().shape({
        image: yup.mixed().required('Image file is required!')
    }),
}