import type { ElementType } from 'react'


export interface RegisteredSetter {
    view: ElementType<SetterCommonProps & {[attr: string]: any}>;
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