import { useState } from "react"
import { IAuthValues } from "../libs/interfaces"

const useAuth = () => {
    const [authValues, setAuthValues] = useState<IAuthValues>({
        email: '',
        password: ''
    })

    return {
        authValues,
        setAuthValues
    }
}

export default useAuth