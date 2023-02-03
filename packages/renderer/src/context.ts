import React from 'react'
import { RendererMode, PropsContextSpec, GlobalDataContextSpec, ContainerDataContextSpec} from './types'
export { PropsContextSpec, GlobalDataContextSpec, ContainerDataContextSpec }


export const PropsContext = React.createContext<PropsContextSpec>({
    components: new Map(),
    rendererMode: RendererMode.design
})

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
