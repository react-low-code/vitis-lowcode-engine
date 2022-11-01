import type { ComponentType } from 'react'


export interface RegisteredSetter {
    view: ComponentType<SetterCommonProps & {}>;
    defaultProps?: object;
    name: string
}

export interface SettersSpec {
    getSetter(name: string): RegisteredSetter | undefined
    getAll(): Map<string, RegisteredSetter>
    register(setter: RegisteredSetter | RegisteredSetter[]): void
    hasSetter(name: string): boolean
}

export interface SetterCommonProps {
    value: any;
    onChange: (val: any) => void;
    field: any;
    defaultValue: any;
}