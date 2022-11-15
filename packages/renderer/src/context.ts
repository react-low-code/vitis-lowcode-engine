import React from 'react'
import { PageSchema, NodeSchema } from 'vitis-lowcode-types'
import { ComponentType, ReactInstance } from 'react'
import { RendererMode } from './types'
import { emptyPageComponent } from './default/component'

export interface ContextSpec {
    schema?: PageSchema;
    components: Map<string, ComponentType>;
    onCompGetRef?: (schema: NodeSchema, ref: ReactInstance | null) => void;
    customCreateElement?: (schema: NodeSchema) => React.ReactNode;
    rendererMode?: RendererMode;
    emptyPageComponent?: React.ReactNode
}

export const Context = React.createContext<ContextSpec>({
    components: new Map(),
    rendererMode: RendererMode.design,
    emptyPageComponent
})
