import { makeAutoObservable } from 'mobx'
import { Point } from 'vitis-lowcode-types'
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
            this.rect = this.designer.getNodeRect(containerNode.id)
        } else {
            this.rect = undefined
        }
    }

    release() {
        this.rect = undefined
    }
}