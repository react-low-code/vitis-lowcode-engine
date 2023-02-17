import { ResultFile } from '../../../types/file'

export default function getFile(): [string[], ResultFile] {
    return [['src'], {
        name: 'types',
        ext: 'ts',
        content: `import { AxiosResponse } from 'axios'
        import { Record } from 'vitis-lowcode-types'
        
        export interface GlobalDataContextSpec {
    // 这是页面数据，通过网络请求得来
    pageData: undefined | null | any[] | {[attr: string]: any};
    pageLoading: boolean;
    // 这是用户填写的表单数据
    formData: undefined | null | {[attr: string]: any}
    // 表单数据错误提示语
    formErrors: undefined | {[attr: string]: any}
    // 更新 formData 的值
    updateFormData: (path: string, value: any) => void
    // 更新 formErrors 的值
    updateFormErrors: (path: string, value: any) => void
}

export interface ContainerDataContextSpec {
    data: GlobalDataContextSpec['pageData'];
    dataLoading: boolean;
}

export interface DataGroup {
    pageData: GlobalDataContextSpec['pageData'],
    containerData: ContainerDataContextSpec['data'],
    formData: GlobalDataContextSpec['formData']
}
export interface DataSourceConfig {
    url: string;
    params?: object;
    method: "GET" | "POST";
    requestHandler?: (params: any) => Record
    responseHandler?: (response: AxiosResponse) => any
    errorHandler?: (reason: any) => void
}
export type DisabledLinkageRule = (pageData: DataGroup['pageData'], containerData: DataGroup['containerData'], formData: DataGroup['formData']) => boolean 
export type HiddenLinkageRule = (pageData: DataGroup['pageData'], containerData: DataGroup['containerData'], formData: DataGroup['formData']) => boolean 
`
    }]
}
