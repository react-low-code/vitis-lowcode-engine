import type EventEmitter from 'eventemitter3';
import { ElementType } from 'react'
import { PageSchema, LifeCycles, JSFunction, Interceptors } from './schema'
import { NodeSchema } from 'vitis-lowcode-types'

export interface ProjectSpec extends EventEmitter {
    updateLifeCycles(name: keyof LifeCycles, value: JSFunction): void
    getLifeCycles(): LifeCycles
    getInterceptors(): Interceptors | undefined
    updateInterceptors(name: keyof Interceptors, value: JSFunction): void
    getSchema(): PageSchema
    insertSchema(schemas: NodeSchema[]): void;
}

export interface ObservableProjectSpec {
    designer: DesignerSpec
    schema: PageSchema
}

export interface DesignerSpec {
    componentImplMap: Map<string, ElementType>
}