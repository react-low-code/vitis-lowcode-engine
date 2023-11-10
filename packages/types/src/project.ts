import type EventEmitter from 'eventemitter3';
import type { ElementType } from 'react'
import { PageSchema, LifeCycles, JSFunction, Interceptors } from './schema'

export interface ProjectSpec extends EventEmitter {
    updateLifeCycles(name: keyof LifeCycles, value: JSFunction): void
    getLifeCycles(): LifeCycles
    getInterceptors(): Interceptors | undefined
    updateInterceptors(name: keyof Interceptors, value: JSFunction): void
}

export interface ObservableProjectSpec {
    designer: DesignerSpec
    schema: PageSchema
}

export interface DesignerSpec {
    componentImplMap: Map<string, ElementType>
}