import { PageSchema, NodeSchema } from 'vitis-lowcode-types'
import Node from '../node'

export default class DocumentModel {
    rootNode: Node<PageSchema>
    private nodeMap: Map<string, Node> = new Map()
    constructor(schema: PageSchema) {
        this.open(schema)
    }

    get schema() {
        return this.rootNode.export()
    }

    createNode<S extends NodeSchema>(schema: S, pNode: Node<S> | null) {
        const node = new Node<S>(this,schema, pNode)
        this.nodeMap.set(node.id, node)
        return node
    }

    open(schema: PageSchema) {
        this.rootNode = this.createNode<PageSchema>(schema, null)
    }

    getNode(id: string) {
        return this.nodeMap.get(id)
    }
}