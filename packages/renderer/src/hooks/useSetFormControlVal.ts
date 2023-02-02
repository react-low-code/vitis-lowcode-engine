import {useEffect, useState, useContext} from 'react'
import { NodeSchema } from 'vitis-lowcode-types'
import { transformStringToFunction } from '../utils'
import { GlobalDataContext, ContainerDataContext } from '../context'
import { Path } from 'depath'
import usePrevVal from './usePrevVal'
import useGetInitVal from './useGetInitVal'

export default function useSetFormControlVal(extraProps: NodeSchema['extraProps'], defaultValue: any) {
    const { updateFormData, formData, pageData } = useContext(GlobalDataContext)
    const {data: containerData, dataLoading} = useContext(ContainerDataContext)
    const [linkageValue, setLinkageValue] = useState<any>()
    const name = extraProps.name && extraProps.name.replace(/\s/g,'')
    const prevFormData = usePrevVal(formData)
    const initVal = useGetInitVal(extraProps, defaultValue)

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
                if (val !== undefined) {
                    setLinkageValue(val)
                }
            }
        }

    }, [extraProps.getValue?.value, pageData, formData, containerData, prevFormData, name])

    useEffect(() => {
        if (name && initVal !== undefined) {
            updateFormData(name, initVal)
        }
    }, [initVal, name])

    useEffect(() => {
        if (name && linkageValue !== undefined) {
            updateFormData(name, linkageValue)
        }
    }, [linkageValue, name])

    return name ? Path.getIn(formData, name): undefined
}