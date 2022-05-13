import { useState } from "react"
import { useSelector } from "react-redux"
import { IAuthValues } from "../libs/interfaces"
import { RootState } from "../store"

const useAuth = () => {
    const [authValues, setAuthValues] = useState<IAuthValues>({
        email: '',
        password: ''
    })

    const isLogin = useSelector((state: RootState) => state.user.authToken);
    const userData = useSelector((state: RootState) => state.user.userData);
    const idUser = useSelector((state: RootState) => state.user.userData.id);

    return {
        authValues,
        isLogin,
        userData,
        idUser,

        setAuthValues,
    }
}

export default useAuth