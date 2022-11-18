import { EventEmitter } from 'eventemitter3'
import { DragObject, LocationEvent, DragObjectType, DragNodeDataObject, DragNodeObject, LocationData } from '../types'
import { makeAutoObservable } from 'mobx'
import type Designer from './designer'

export function isDragDataNode(dragObject: DragObject): dragObject is DragNodeDataObject {
    return dragObject.type === DragObjectType.NodeData
}

export function isDragNode(dragObject: DragObject): dragObject is DragNodeObject {
    return dragObject.type === DragObjectType.Node
}

export class Dragon {
    dragging: boolean = false
    dragObject: DragObject | null = null
    locationData: LocationData | undefined

    readonly designer: Designer

    constructor(designer: Designer) {
        makeAutoObservable(this, {
            designer: false,
        })
        this.designer = designer
    }


    bindDragStart = (dragObject: DragObject | null) => {
        this.dragging = true
        this.dragObject = dragObject
    }

    bindDrop = (event: DragEvent) => {
        this.dragging = false
        this.dragObject = null
        this.locationData = undefined
    }

    onDragOver = (e: DragEvent) => {
        if (this.dragObject) {
            const locateEvent = this.createLocationEvent(e)
            this.locationData = this.locate(locateEvent)
        }
    }

    private locate = (locateEvent: LocationEvent) => {
        const container = this.designer.getDropContainer(locateEvent)

        if (container) {
            const locationData: LocationData = {
                index: 0,
                containerNode: container.node,
                containerRect: container.rect
            }

            const { children } = container.node
            const { clientY } = locateEvent

            if (children.length > 0) {
                let minDistance = Infinity
                // 容器中最近的插入点
                let minIndex = 0
                children.forEach((child, index) => {
                    const rect = this.designer.getNodeRect(child.id)
                    if (rect && Math.abs(rect.top - clientY) < minDistance) {
                        minDistance = Math.abs(rect.top - clientY)
                        minIndex = index
                    }
                })

                locationData.index = minIndex
            }

            return locationData
        }
    }

    private createLocationEvent = (e: DragEvent): LocationEvent => {
        return {
            type: 'LocateEvent',
            dragObject: this.dragObject!,
            target: e.target,
            originalEvent: e,
            clientX: e.clientX,
            clientY: e.clientY
        }
    }
}