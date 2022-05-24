import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { IAuthValues, ICartItem, IUserData, IWishlistItem } from "../libs/interfaces";

const auth = getAuth();

export const authRegister = async ({ email, password }: IAuthValues) => {
    const response = await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential: any) => {
            const user = userCredential.user
            const userData: IUserData = {
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

export const updateWishlistUser = async (wishlistItems: Array<IWishlistItem>, id: string) => {
    const userRef = doc(db, 'users', id)

    const response = await updateDoc(userRef, { wishlistItems }).then(async () => {
        const userData = await getUserData(id)
        return userData
    })
    return response

}

export const updateCartItemsUser = async (cartItems: Array<ICartItem>, id: string) => {
    const userRef = doc(db, 'users', id)

    const response = await updateDoc(userRef, { cartItems }).then(async () => {
        const userData = await getUserData(id)
        return userData
    })
    return response

}
export const updateOrdersHistoryUser = async (ordersHistory: Array<ICartItem>, id: string) => {
    const userRef = doc(db, 'users', id);
    console.log('asasasasas')
    const response = await updateDoc(userRef, { ordersHistory }).then(async () => {
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

