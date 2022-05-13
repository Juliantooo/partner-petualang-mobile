import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { IAuthValues, IUserDataProps } from "../libs/interfaces";

const auth = getAuth();

export const authRegister = async ({ email, password }: IAuthValues) => {
    const response = await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential: any) => {
            const user = userCredential.user
            const userData: IUserDataProps = {
                email,
                password,
                id: user.uid,
                address: '',
                name: '',
                phone: '',
                image: '',
            }
            await createUser(userData)
            return user
        })

    return response
}

export const authLogin = async ({ email, password }: IAuthValues) => {
    const response = await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            return user
        })

    return response
}

export const createUser = async ({ email, password, id, address, name, phone, image }: IUserDataProps) => {
    const userRef = doc(db, 'users', id)
    await setDoc(userRef, {
        email, password, id, address, name, phone, image
    })
}

export const getUserData = async (id: string) => {
    const userRef = doc(db, 'users', id)
    const userSnapshot = await getDoc(userRef)

    if (!userSnapshot.exists()) return 'error';
    return userSnapshot.data()
}


export const updateUser = async (data: any, id: string) => {
    const userRef = doc(db, 'users', id)

    const response = await updateDoc(userRef, data).then(async () => {
        const userData = await getUserData(id)
        return userData
    })

    return response

}

export const userLogout = async () => {

    const response = await signOut(auth).then(() => {
        return true
    })

    return response
}