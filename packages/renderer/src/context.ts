import React from 'react'
import { PageSchema, NodeSchema } from 'vitis-lowcode-types'
import { ElementType } from 'react'
import { RendererMode } from './types'

// 这个 Context 中的字段是外部传入的
export interface PropsContextSpec {
    schema?: PageSchema;
    components: Map<string, ElementType>;
    onCompGetRef?: (schema: NodeSchema, domElement: HTMLElement | null) => void;
    rendererMode?: RendererMode;
    customEmptyElement?: (schema: NodeSchema) => React.ReactNode;
    interceptors?: PageSchema['interceptors']
}

export const PropsContext = React.createContext<PropsContextSpec>({
    components: new Map(),
    rendererMode: RendererMode.design
})

// 这是 renderer 产生的数据
export interface GlobalDataContextSpec {
    // 这是页面数据，通过网络请求得来
    page: undefined | null | any[] | {[attr: string]: any};
    pageLoading: boolean;
    // 这是用户填写的表单数据
    formData: undefined | null | {[attr: string]: any}
}

export const GlobalDataContext = React.createContext<GlobalDataContextSpec>({
    page: undefined,
    pageLoading: false,
    formData: undefined
})

// 这是容器类组件提供给子孙组件的数据
export interface ContainerDataContextSpec {
    data: GlobalDataContextSpec['page'];
    dataLoading: boolean;
}

export const ContainerDataContext = React.createContext<ContainerDataContextSpec>({
    data: undefined,
    dataLoading: false
})
