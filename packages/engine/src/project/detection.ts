import { makeAutoObservable } from 'mobx'
import { Point } from 'vitis-lowcode-types'
import Node from '../node'
import type Designer from './designer'

export default class Detection {
    rect: DOMRect | undefined
    designer: Designer

    constructor(designer: Designer) {
        makeAutoObservable(this, {
            designer: false
        })

        this.designer = designer
    }

    capture(point: Point) {
        const containerNode = this.designer.host.getClosestNodeByLocation(point)
        if (containerNode) {
            this.computedRectByNode(containerNode.id)
        } else {
            this.rect = undefined
        }
    }

    computedRectByNode(nodeId: string) {
        this.rect = this.designer.getNodeRect(nodeId)
    }

    release() {
        this.rect = undefined
    }
}