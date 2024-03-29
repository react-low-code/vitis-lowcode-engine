import { NodeSchema, ContainerSchema } from 'vitis-lowcode-types'
import { makeAutoObservable } from 'mobx'
import type ComponentSpec from '../project/componentSpec'
import Props from './props'
import { uniqueId } from '../utils'
import type DocumentModel from '../project/documentModel'
import SettingTopEntry from '../setting/SettingTopEntry'

export default class Node<S extends NodeSchema = NodeSchema> {
    readonly id: string;
    readonly componentName: string;
    readonly isContainer: boolean;
    parent: Node<NodeSchema> | undefined;
    readonly owner: DocumentModel
    protected children: Node<NodeSchema>[]
    readonly props: Props
    readonly extraProps: Props
    readonly containerType?: ContainerSchema['containerType']
    readonly packageName: string
    private _settingEntry: SettingTopEntry | undefined
    readonly isFormControl: boolean

    get componentSpec(): ComponentSpec {
        const result = this.owner.project.designer.componentSpecMap.get(this.packageName)
        if (!result) {
            throw `不存在 ${this.packageName} 组件`
        }
        return result
    }

    get title() {
        return this.componentSpec.title
    }

    get lastChild(): Node<NodeSchema> | undefined {
        return this.children[this.children.length - 1]
    }

    get childrenSize(): number {
        return this.children.length
    }

    constructor(owner: DocumentModel,initSchema: S, parent: Node<S> | undefined) {
        makeAutoObservable(this, {
            id: false,
            componentName: false,
            isContainer: false,
            owner: false,
            isFormControl: false,
            containerType: false
        })

        this.parent = parent
        this.id = initSchema.id || uniqueId('node')
        this.componentName = initSchema.componentName
        this.packageName = initSchema.packageName
        this.isContainer = initSchema.isContainer
        this.containerType = initSchema.containerType
        this.isFormControl = !!initSchema.isFormControl
        this.owner = owner

        this.children = initSchema.children.map(child => this.owner.createNode(child, this))
        this.props = new Props(this, initSchema.props)
        this.extraProps = new Props(this, initSchema.extraProps)
    }

    get settingEntry(): SettingTopEntry {
        if (this._settingEntry) {
            return this._settingEntry
        }

        this._settingEntry = new SettingTopEntry(this)

        return this._settingEntry
    }

    export(): NodeSchema {
        return {
            id: this.id,
            componentName: this.componentName,
            packageName: this.packageName,
            isContainer: this.isContainer,
            props: this.props.export(),
            extraProps: this.extraProps.export(),
            containerType: this.containerType,
            children: this.children.map(child => child.export()),
            isFormControl: this.isFormControl
        }
    }

    inertChildAtIndex = (node: Node<NodeSchema>, index: number) => {
        node.parent = this
        this.children.splice(index, 0, node)
    }

    insertAfter = (node: Node<NodeSchema>, afterNode: Node<NodeSchema>) => {
        node.parent = this
        const index = this.children.findIndex(child => child === afterNode)

        if (index === -1) {
            this.children.push(node)
        } else {
            this.children.splice(index, 0, node)
        }
    }

    delChildAtIndex = (index: number) => {
        this.children.splice(index, 1)
    }

    getChildAtIndex = (index: number): Node<NodeSchema> | undefined => {
        return this.children[index]
    }

    delChild = (child: Node<NodeSchema>) => {
        this.children = this.children.filter(item => item !== child)
    }

    getProp = (propName: string, createIfNone = true) => {
        return this.props.getProp(propName, createIfNone)
    }

    getExtraProp = (propName: string, createIfNone = true) => {
        return this.extraProps.getProp(propName, createIfNone)
    }
}