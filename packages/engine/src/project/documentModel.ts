import { PageSchema, NodeSchema } from 'vitis-lowcode-types'
import { makeAutoObservable } from 'mobx'
import Node from '../node'

export default class DocumentModel {
    rootNode: Node<PageSchema>
    private nodeMap: Map<string, Node> = new Map()
    selectedNodeId?: string
    hoveredNodeId?: string

    constructor(schema: PageSchema) {
        makeAutoObservable(this)
        this.open(schema)
    }

    get schema() {
        return this.rootNode.export()
    }

    get currentNode() {
        return this.selectedNodeId ? this.nodeMap.get(this.selectedNodeId) : undefined
    }

    createNode<S extends NodeSchema>(schema: S, pNode: Node<S> | undefined) {
        const node = new Node<S>(this,schema, pNode)
        this.nodeMap.set(node.id, node)
        return node
    }

    open(schema: PageSchema) {
        this.rootNode = this.createNode<PageSchema>(schema, undefined)
    }

    getNode(id: string) {
        return this.nodeMap.get(id)
    }

    selectNode(id?: string) {
        this.selectedNodeId = id
    }

    hoverNode(id?: string) {
        this.hoveredNodeId = id
    }
}