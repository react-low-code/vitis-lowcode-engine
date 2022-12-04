import { makeAutoObservable } from 'mobx'
import { PropValue } from 'vitis-lowcode-types'

import { uniqueId } from '../utils'

import type Node from './index'
import type Props from './props'

function isComplexProp(prop: any): boolean {
    return prop.value && typeof prop.value === 'object'
}

export default class Prop {
    readonly id: string = uniqueId('prop')
    owner: Node
    parent: Props
    name: string
    value: PropValue

    constructor(parent: Props, value: PropValue, name: string) {
        makeAutoObservable(this, {
            id: false
        })

        this.parent = parent
        this.owner = parent.owner
        this.name = name
        this.value = value

    }

    export() {
        return this.value
    }

    setValue(value: PropValue, subName?: string) {
        if (subName) {
            if (isComplexProp(this.value)) {
                (this.value as any).value[subName] = value
            } else {
                console.error(`${this.name} 不存在一个名为 ${subName} 的子字段`)
            }
        } else {
            this.value = value
        }
    }

    getValue(subName?: string) {
        if (!subName) {
            return this.export()
        } else {
            if (isComplexProp(this.value)) {
                return (this.value as any).value[subName]
            } else {
                console.error(`${this.name} 不存在一个名为 ${subName} 的子字段`)
                return ''
            }
        }
    }
}
