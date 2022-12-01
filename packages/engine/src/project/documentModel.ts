import { PageSchema, NodeSchema } from 'vitis-lowcode-types'
import { makeAutoObservable } from 'mobx'
import Node from '../node'
import type Project from './index'

export default class DocumentModel {
    rootNode: Node<PageSchema>
    private nodeMap: Map<string, Node> = new Map()
    selectedNodeId?: string
    hoveredNodeId?: string
    readonly project: Project

    constructor(project: Project,schema: PageSchema) {
        makeAutoObservable(this)
        this.open(schema)
        this.project = project
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

    delNode(nodeId: string) {
        const thisNode = this.nodeMap.get(nodeId)
        if (thisNode) {
            this.nodeMap.delete(nodeId)
            thisNode.parent?.delChild(thisNode)
            this.project.designer.rerender()
        }
    }

    copyNode(node: Node<NodeSchema>) {
        const schema = node.export()
        delete schema.id

        return this.createNode(schema, undefined)
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