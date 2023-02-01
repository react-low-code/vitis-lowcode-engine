import {useEffect, useState, useContext} from 'react'
import { NodeSchema } from 'vitis-lowcode-types'
import { transformStringToFunction } from '../utils'
import { GlobalDataContext, ContainerDataContext } from '../context'
import { Path } from 'depath'
import usePrevVal from './usePrevVal'

export default function useSetFormControlVal(extraProps: NodeSchema['extraProps'], defaultValue: any) {
    const { updateFormData, formData, pageData } = useContext(GlobalDataContext)
    const {data: containerData, dataLoading} = useContext(ContainerDataContext)
    const [linkageValue, setLinkageValue] = useState<any>()
    const name = extraProps.name && extraProps.name.replace(/\s/g,'')
    const pathToVal = extraProps.pathToVal && extraProps.pathToVal.replace(/\s/g,'')
    const [initVal, setInitVal] = useState<any>()
    const prevFormData = usePrevVal(formData)

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

    useEffect(() => {
        function computedVal() {
            if (!extraProps.getValue || !extraProps.getValue.value) {
                return undefined
            }
            const func = transformStringToFunction(extraProps.getValue.value)
            if (typeof func === 'function') {
                try {
                    return func(pageData, containerData, formData)
                } catch (error) {
                    return undefined
                }
                
            } else {
                return undefined
            }
        }

        if (extraProps.getValue && extraProps.getValue.value) {
            if (name && JSON.stringify(Path.deleteIn({...formData}, name)) !== JSON.stringify(Path.deleteIn({...prevFormData}, name))) {
                const val = computedVal()
                if (val) {
                    setLinkageValue(val)
                }
            }
        }

    }, [extraProps.getValue?.value, pageData, formData, containerData, prevFormData, name])

    useEffect(() => {
        if (name) {
            updateFormData(name, initVal)
        }
    }, [initVal, name])

    useEffect(() => {
        if (name) {
            updateFormData(name, linkageValue)
        }
    }, [linkageValue, name])

    return name ? Path.getIn(formData, name): undefined
}