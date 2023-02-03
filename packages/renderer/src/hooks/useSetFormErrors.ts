import { useContext } from 'react'
import { NodeSchema } from 'vitis-lowcode-types'
import { transformStringToFunction } from '../utils'
import { GlobalDataContext } from '../context'
import { Path } from 'depath'

export default function useSetFormErrors(extraProps: NodeSchema['extraProps']) {
    const { updateFormErrors, formData, formErrors } = useContext(GlobalDataContext)
    const name = extraProps.name && extraProps.name.replace(/\s/g,'')
    if (name) {
        const value = Path.getIn(formData, name)
        const requiredRule = (extraProps['verifyRules'] || []).find(rule => rule.required === true)
        const minLenRule = (extraProps['verifyRules'] || []).find(rule => rule.min !== undefined)
        const maxLenRule = (extraProps['verifyRules'] || []).find(rule => rule.max !== undefined)
        const customizedRule = (extraProps['verifyRules'] || []).find(rule => rule.customized !== undefined)

        if (!value && !!requiredRule) {
            updateFormErrors(name, requiredRule.message || '这是必填字段')
            return
        }

        if (minLenRule && (!value || typeof value === 'string' && value.length < Number(minLenRule.min))) {
            updateFormErrors(name, minLenRule.message || `至少${minLenRule.min}个字符`)
            return
        }

        if (maxLenRule && typeof value === 'string' && value.length > Number(maxLenRule.max)) {
            updateFormErrors(name, maxLenRule.message || `最多${maxLenRule.max}个字符`)
            return
        }

        if (customizedRule && customizedRule.customized?.value) {
            const func = transformStringToFunction(customizedRule.customized?.value)
            if (typeof func === 'function') {
                try {
                    let result = func(value, formData);
                    result = typeof result === 'boolean' ? {status: result, message: ''} : result;

                    if (result.status === false) {
                        updateFormErrors(name, result.message || '数据不合法')
                    }
                } catch (error) {
                    console.error(error)
                }
            }
        }

        return Path.getIn(formErrors, name)
    }
}