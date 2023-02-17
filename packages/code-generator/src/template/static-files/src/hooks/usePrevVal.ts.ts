import { ResultFile } from '../../../../types/file'

export default function getFile(): [string[], ResultFile] {
    return [['src','hooks'], {
        name: 'usePrevVal',
        ext: 'ts',
        content: `import { useEffect, useRef, useState } from 'react'

        export default function usePrevVal<T>(status: T) {
            const ref = useRef<T>()
            const [prevVal, setPrevVal] = useState<T>()
            useEffect(() => {
                setPrevVal(ref.current)
                ref.current = status
            }, [status])
        
            return prevVal
        }`
    }]
}
