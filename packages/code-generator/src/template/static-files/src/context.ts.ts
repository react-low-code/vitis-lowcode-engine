import { ResultFile } from '../../../types/file'

export default function getFile(): [string[], ResultFile] {
    return [['src'], {
        name: 'context',
        ext: 'ts',
        content: `
        import React from 'react'
import { GlobalDataContextSpec, ContainerDataContextSpec} from './types'
export { GlobalDataContextSpec, ContainerDataContextSpec }

export const GlobalDataContext = React.createContext<GlobalDataContextSpec>({
    pageData: undefined,
    pageLoading: false,
    formData: undefined,
    formErrors: undefined,
    updateFormData() {
        console.error('你还没有实现 updateFormData 方法')
    },
    updateFormErrors() {
        console.error('你还没有实现 updateFormData 方法')
    }
})

export const ContainerDataContext = React.createContext<ContainerDataContextSpec>({
    data: undefined,
    dataLoading: false
})
        `
    }]
}
