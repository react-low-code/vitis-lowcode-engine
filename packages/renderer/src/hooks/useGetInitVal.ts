import {useEffect, useState, useContext} from 'react'
import { ContainerDataContext } from '../context'
import { NodeSchema } from 'vitis-lowcode-types'
import { Path } from 'depath'

export default function useGetInitVal(extraProps: NodeSchema['extraProps'], defaultValue: any) {
    const {data: containerData, dataLoading} = useContext(ContainerDataContext)
    const pathToVal = extraProps.pathToVal && extraProps.pathToVal.replace(/\s/g,'')
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
}