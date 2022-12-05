import type EventEmitter from 'eventemitter3';
import { ComponentType } from 'react'
import { PageSchema, LifeCycles, JSFunction } from 'vitis-lowcode-types'

export interface ProjectSpec extends EventEmitter {
    updateLifeCycles(name: keyof LifeCycles, value: JSFunction): void
    getLifeCycles(): LifeCycles
}

export interface ObservableProjectSpec {
    designer: DesignerSpec
    schema: PageSchema
}

export interface DesignerSpec {
    componentImplMap: Map<string, ComponentType>
}