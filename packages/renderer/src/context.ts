import React from 'react'
import { PageSchema, NodeSchema } from 'vitis-lowcode-types'
import { ComponentType } from 'react'
import { RendererMode } from './types'

export interface ContextSpec {
    schema?: PageSchema;
    components: Map<string, ComponentType>;
    onCompGetRef?: (schema: NodeSchema, domElement: HTMLElement | null) => void;
    customCreateElement?: (schema: NodeSchema) => React.ReactNode;
    rendererMode?: RendererMode;
    customEmptyElement?: (schema: NodeSchema) => React.ReactNode;
}

export const Context = React.createContext<ContextSpec>({
    components: new Map(),
    rendererMode: RendererMode.design
})
