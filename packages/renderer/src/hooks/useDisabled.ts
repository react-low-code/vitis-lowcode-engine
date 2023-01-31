import {useEffect, useState} from 'react'
import { JSFunction } from 'vitis-lowcode-types'
import { transformStringToFunction } from '../utils'
import { DataGroup } from '../types'

export default function useDisabled(dataGroup: DataGroup, isDisabled?: JSFunction) {
    function computedDisabled() {
        if (!isDisabled || !isDisabled.value) {
            return false
        }
        const func = transformStringToFunction(isDisabled.value)
        if (typeof func === 'function') {
            try {
                return func(dataGroup.pageData, dataGroup.containerData, dataGroup.formData)
            } catch (error) {
                return false
            }
            
        } else {
            return false
        }
    }
    const [disabled, setDisabled] = useState<boolean>(computedDisabled)

    useEffect(() => {
        setDisabled(computedDisabled())
    }, [isDisabled?.value, dataGroup.pageData, dataGroup.formData, dataGroup.containerData])

    return disabled
}