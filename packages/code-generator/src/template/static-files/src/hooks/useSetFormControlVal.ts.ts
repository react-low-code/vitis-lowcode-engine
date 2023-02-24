import { ResultFile } from '../../../../types/file'

export default function getFile(): [string[], ResultFile] {
    return [['src','hooks'], {
        name: 'useSetFormControlVal',
        ext: 'ts',
        content: `import {useEffect, useState, useContext} from 'react'
        import { GlobalDataContext, ContainerDataContext } from '../context'
        import { Path } from 'depath'
        import usePrevVal from './usePrevVal'
        import useGetInitVal from './useGetInitVal'
        import { HiddenLinkageRule } from '../types'

        interface Params {
            name?: string;
            getValue?: HiddenLinkageRule;
            pathToVal?: string
        }
        
        export default function useSetFormControlVal(params: Params, defaultValue: any) {
            const { updateFormData, formData, pageData } = useContext(GlobalDataContext)
            const {data: containerData} = useContext(ContainerDataContext)
            const [linkageValue, setLinkageValue] = useState<any>()
            const name = params.name && params.name.replace(/\s/g,'')
            const prevFormData = usePrevVal(formData)
            const initVal = useGetInitVal(params.pathToVal, defaultValue)
        
            useEffect(() => {
                function computedVal() {
                    if (!params.getValue) {
                        return undefined
                    }
                    try {
                        return params.getValue(pageData, containerData, formData)
                    } catch (error) {
                        return undefined
                    }
                }
        
                if (params.getValue) {
                    if (name && JSON.stringify(Path.deleteIn({...formData}, name)) !== JSON.stringify(Path.deleteIn({...prevFormData}, name))) {
                        const val = computedVal()
                        if (val !== undefined) {
                            setLinkageValue(val)
                        }
                    }
                }
        
            }, [params.getValue, pageData, formData, containerData, prevFormData, name])
        
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
        }`
    }]
}
