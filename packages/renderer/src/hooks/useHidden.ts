import {useEffect, useState} from 'react'
import { JSFunction } from 'vitis-lowcode-types'
import { transformStringToFunction } from '../utils'
import { DataGroup } from '../types'

export default function useHidden(dataGroup: DataGroup, isHidden?: JSFunction) {
    function computedHidden() {
        if (!isHidden || !isHidden.value) {
            return false
        }
        const func = transformStringToFunction(isHidden.value)
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
    const [hidden, setHidden] = useState<boolean>(computedHidden)

    useEffect(() => {
        setHidden(computedHidden())
    }, [isHidden?.value, dataGroup.pageData, dataGroup.formData, dataGroup.containerData])

    return hidden
}