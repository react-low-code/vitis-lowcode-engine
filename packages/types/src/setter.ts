import type { ComponentType } from 'react'


export interface RegisteredSetter {
    view: ComponentType<SetterCommonProps & {[attr: string]: any}>;
    name: string
}

export interface SettersSpec {
    register(setter: RegisteredSetter | RegisteredSetter[]): void
    getSetter(name: string): RegisteredSetter | undefined
    getAll(): Map<string, RegisteredSetter>
    hasSetter(name: string): boolean
}

export interface SetterCommonProps {
    value: any;
    onChange?: (val: any) => void;
    field: any;
}