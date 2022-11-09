import { NodeSchema } from 'vitis-lowcode-types'
import { makeAutoObservable } from 'mobx'
import { project } from '../shell'
import type ComponentSpec from '../project/componentSpec'
import Props from './props'
import { uniqueId } from '../utils'

export default class Node<S extends NodeSchema = NodeSchema> {
    readonly id: string;
    readonly componentName: string;
    readonly isContainer: boolean;
    readonly schema: S
    readonly parent: Node<NodeSchema> | null;
    readonly children: Node<NodeSchema>[]
    readonly props: Props

    get componentSpec(): ComponentSpec {
        const result = project.project.designer.componentSpecMap.get(this.componentName)
        if (!result) {
            throw `不存在 ${this.componentName} 组件`
        }
        return result
    }

    get nextSibling(): Node<NodeSchema> | null {
        if (this.parent) {
            const index = this.parent.children.findIndex(c => c === this)
            if (index === -1) {
                return null
            } else {
                return this.parent.children[index + 1] || null
            }
        } else {
            return null
        }
    }

    get prevSibling(): Node<NodeSchema> | null {
        if (this.parent) {
            const index = this.parent.children.findIndex(c => c === this)
            if (index === -1) {
                return null
            } else {
                return this.parent.children[index - 1] || null
            }
        } else {
            return null
        }
    }

    constructor(schema: S, parent: Node<S> | null) {
        makeAutoObservable(this, {
            id: false,
            componentName: false,
            isContainer: false
        })

        this.parent = parent
        this.id = schema.id || uniqueId('node')
        this.componentName = schema.componentName
        this.isContainer = schema.isContainer
        this.schema = schema

        this.children = schema.children.map(child => new Node<NodeSchema>(child, this))
        this.props = new Props(this, schema.props)
    }

    export(): NodeSchema {
        return {
            id: this.id,
            componentName: this.componentName,
            isContainer: this.isContainer,
            props: this.props.export(),
            children: this.children.map(child => child.export()),
        }
    }
}