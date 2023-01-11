import React from 'react'
import { PageSchema, NodeSchema } from 'vitis-lowcode-types'
import { ElementType } from 'react'
import { RendererMode } from './types'

export interface ContextSpec {
    schema?: PageSchema;
    components: Map<string, ElementType>;
    onCompGetRef?: (schema: NodeSchema, domElement: HTMLElement | null) => void;
    rendererMode?: RendererMode;
    customEmptyElement?: (schema: NodeSchema) => React.ReactNode;
    interceptors?: PageSchema['interceptors']
}

export const Context = React.createContext<ContextSpec>({
    components: new Map(),
    rendererMode: RendererMode.design
})
