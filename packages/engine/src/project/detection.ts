import { makeAutoObservable } from 'mobx'
import type Designer from './designer'

export default class Detection {
    designer: Designer
    hoveredNodePosition: DOMRect | undefined
    selectedNodePosition: DOMRect | undefined

    constructor(designer: Designer) {
        makeAutoObservable(this, {
            designer: false
        })

        this.designer = designer
    }

    computeHoveredPosition(nodeId?: string) {
        if (nodeId) {
            this.hoveredNodePosition = this.designer.getNodeRect(nodeId)
        } else {
            this.hoveredNodePosition = undefined
        }
    }

    computeSelectedPosition(nodeId?: string) {
        if (nodeId) {
            this.selectedNodePosition = this.designer.getNodeRect(nodeId)
        } else {
            this.selectedNodePosition = undefined
        }
    }
}