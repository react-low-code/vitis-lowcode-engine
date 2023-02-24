import { ResultFile } from '../../../../types/file'


export default function getFile(): [string[], ResultFile] {
    return [['src','hooks'], {
        name: 'useSetFormErrors',
        ext: 'ts',
        content: `import { useContext, useEffect, useState } from 'react'
        import { GlobalDataContext, GlobalDataContextSpec } from '../context'
        import { Path } from 'depath'

        interface Params {
            name?: string;
            verifyRules?:  {
                max?: string;
                min?: string;
                required?: boolean;
                //  校验没有通过时的提示语
                message?: string;
                // 自定义的校验规则
                customized?: (value: any, formData: GlobalDataContextSpec['formData']) => any;
            }[]
        }
        
        export default function useSetFormErrors(params: Params) {
            const { updateFormErrors, formData, formErrors } = useContext(GlobalDataContext)
            const name = params.name && params.name.replace(/\s/g,'')
            const value = name ? Path.getIn(formData, name) : ''
            const [error, setError] = useState<string>();
        
            useEffect(() => {
                if (name) {
                    const requiredRule = (params['verifyRules'] || []).find(rule => rule.required === true)
                    const minLenRule = (params['verifyRules'] || []).find(rule => rule.min !== undefined)
                    const maxLenRule = (params['verifyRules'] || []).find(rule => rule.max !== undefined)
                    const customizedRule = (params['verifyRules'] || []).find(rule => rule.customized !== undefined)
            
                    if (!value && !!requiredRule) {
                        updateFormErrors(name, requiredRule.message || '这是必填字段')
                        return
                    }
            
                    if (minLenRule && (!value || typeof value === 'string' && value.length < Number(minLenRule.min))) {
                        updateFormErrors(name, minLenRule.message || '至少minLenRule.min个字符')
                        return
                    }
            
                    if (maxLenRule && typeof value === 'string' && value.length > Number(maxLenRule.max)) {
                        updateFormErrors(name, maxLenRule.message || '最多maxLenRule.max个字符')
                        return
                    }
            
                    if (customizedRule && customizedRule.customized) {
                        try {
                            let result = customizedRule.customized(value, formData);
                            result = typeof result === 'boolean' ? {status: result, message: ''} : result;
        
                            if (result.status === false) {
                                updateFormErrors(name, result.message || '数据不合法')
                                return
                            }
                        } catch (error) {
                            console.error(error)
                        }
                    }
        
                    updateFormErrors(name, undefined)
                }
            }, [name,params['verifyRules'], value])
            
        
            useEffect(() => {
                if (name) {
                    setError(Path.getIn(formErrors, name))
                }
            }, [formErrors])
        
            return error
        }`
    }]
}
