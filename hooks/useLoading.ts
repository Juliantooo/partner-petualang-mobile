import { useState } from "react"

const useLoading = () => {
    const [isLoading, setIsLoading] = useState<Boolean>(false);

    return {
        isLoading,
        setIsLoading
    }
}

export default useLoading