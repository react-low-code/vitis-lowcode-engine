import { ResultFile } from '../../../../types/file'

export default function getFile(): [string[], ResultFile] {
    return [['src','hooks'], {
        name: 'useGetInitVal',
        ext: 'ts',
        content: `import {useEffect, useState, useContext} from 'react'
        import { ContainerDataContext } from '../context'
        import { Path } from 'depath'
        
        export default function useGetInitVal(pathToVal?: string, defaultValue?: any) {
            const {data: containerData, dataLoading} = useContext(ContainerDataContext)
            pathToVal = pathToVal && pathToVal.replace(/\s/g,'')
            const [initVal, setInitVal] = useState<any>()
        
            useEffect(() => {
                function getInitValue() {
                    if (!dataLoading) {
                        return containerData && pathToVal ? Path.getIn(containerData, pathToVal): defaultValue
                    } else {
                        return undefined
                    }
                }
                setInitVal(getInitValue)
            },[dataLoading, containerData, pathToVal])
        
            return initVal
        }`
    }]
}
