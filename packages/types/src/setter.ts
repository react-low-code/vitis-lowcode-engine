import { ComponentType } from 'react'

export interface RegisteredSetter {
    view: ComponentType;
    defaultProps?: object;
    name: string
}

export interface SettersSpec {
    getSetter(name: string): RegisteredSetter | undefined
    getAll(): Map<string, RegisteredSetter>
    register(setter: RegisteredSetter | RegisteredSetter[]): void
    hasSetter(name: string): boolean
}