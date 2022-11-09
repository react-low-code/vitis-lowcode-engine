import { PageSchema, NodeSchema } from 'vitis-lowcode-types'
import Node from '../node'

export default class DocumentModel {
    rootNode: Node<PageSchema>
    constructor(schema: PageSchema) {
        this.rootNode = this.createNode<PageSchema>(schema, null)
    }

    get schema() {
        return this.rootNode.export()
    }

    createNode<S extends NodeSchema>(schema: S, pNode: Node<S> | null) {
        return new Node<S>(schema, pNode)
    }
}