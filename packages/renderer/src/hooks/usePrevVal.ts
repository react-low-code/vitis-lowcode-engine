import { useEffect, useRef, useState } from 'react'

export default function usePrevVal<T>(status: T) {
    const ref = useRef<T>()
    const [prevVal, setPrevVal] = useState<T>()
    useEffect(() => {
        setPrevVal(ref.current)
        ref.current = status
    }, [status])

    return prevVal
}