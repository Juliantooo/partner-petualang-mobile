import { useState } from "react"
import { useSelector } from "react-redux"
import { IAuthValues, IUser } from "../libs/interfaces"
import { RootState } from "../store"

const useAuth = () => {
    const [authValues, setAuthValues] = useState<IAuthValues>({
        email: '',
        password: ''
    })

    const isLogin: boolean = useSelector((state: RootState) => state.user.authToken ? true : false);
    const userData: IUser = useSelector((state: RootState) => state.user.userData);
    const idUser: string = useSelector((state: RootState) => state.user.userData.id);

    return {
        authValues,
        isLogin,
        userData,
        idUser,

        setAuthValues,
    }
}

export default useAuth