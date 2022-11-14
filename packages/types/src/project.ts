import type EventEmitter from 'eventemitter3';
import { ComponentType } from 'react'
import { PageSchema } from 'vitis-lowcode-types'

export interface ProjectSpec extends EventEmitter{}

export interface ObservableProjectSpec {
    designer: DesignerSpec
    schema: PageSchema
}

export interface DesignerSpec {
    componentImplMap: Map<string, ComponentType>
}