import { PageSchema, NodeSchema } from 'vitis-lowcode-types'
import { ElementType } from 'react'

export enum RendererMode {
    design,
    runtime
}

export interface PropsContextSpec {
    schema?: PageSchema;
    components: Map<string, ElementType>;
    onCompGetRef?: (schema: NodeSchema, domElement: HTMLElement | null) => void;
    rendererMode?: RendererMode;
    customEmptyElement?: (schema: NodeSchema) => React.ReactNode;
    interceptors?: PageSchema['interceptors']
}

export interface GlobalDataContextSpec {
    // 这是页面数据，通过网络请求得来
    pageData: undefined | null | any[] | {[attr: string]: any};
    pageLoading: boolean;
    // 这是用户填写的表单数据
    formData: undefined | null | {[attr: string]: any}
    // 更新 formData 的值
    updateFormData: (path: string, value: any) => void
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
