import { 
     makeAutoObservable
} from 'mobx'
import { NodeSchema, PropValue } from 'vitis-lowcode-types'
import { uniqueId } from '../utils'

import Prop from './prop'
import Node from './index'

export default class Props {
    readonly id = uniqueId('props');
    items: Prop[] = []
    owner: Node

    constructor(owner: Node, values: NodeSchema['props'] = {}) {
        makeAutoObservable(this, {
            owner: false,
            id: false
        })

        this.owner = owner
        
        this.items = Object.keys(values).map(key=> new Prop(this, values[key],key))
    }

    export() {
        const result: {[key: string]: PropValue;} = {}
        
        this.items.forEach(item => {
            result[item.name] = item.export()
        })

        return result
    }

    getProp(propName: string, createIfNone = true) {
        let prop = this.items.find(prop => prop.name === propName)
        if (createIfNone && !prop) {
            prop = new Prop(this, undefined,propName)
            this.items.push(prop)
        }
        return prop
    }
}