import type EventEmitter from 'eventemitter3';
import { ComponentType } from 'react'

export interface ProjectSpec extends EventEmitter{}

export interface ObservableProjectSpec {
    designer: DesignerSpec
}

export interface DesignerSpec {
    componentImplMap: Map<string, ComponentType>
}