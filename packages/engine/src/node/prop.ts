import { makeAutoObservable } from 'mobx'
import { PropValue } from 'vitis-lowcode-types'

import { uniqueId } from '../utils'

import type Node from './index'
import type Props from './props'

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
}