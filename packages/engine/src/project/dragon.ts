import { DragObject, LocationEvent, DragObjectType, DragNodeDataObject, DragNodeObject, DropLocation } from '../types'
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
    dropLocation: DropLocation | undefined

    readonly designer: Designer

    constructor(designer: Designer) {
        makeAutoObservable(this, {
            designer: false,
        })
        this.designer = designer
    }


    onDragStart = (dragObject: DragObject | null) => {
        this.dragging = true
        this.dragObject = dragObject
    }

    onDragEnd = (event: DragEvent) => {
        this.dragging = false
        this.dragObject = null
        this.dropLocation = undefined
    }

    onDragOver = (e: DragEvent) => {
        if (this.dragObject) {
            const locateEvent = this.createLocationEvent(e)
            this.dropLocation = this.locate(locateEvent)
        }
    }

    private locate = (locateEvent: LocationEvent) => {
        const container = this.designer.getDropContainer(locateEvent)

        if (container) {
            const dropLocation: DropLocation = {
                index: 0,
                containerNode: container,
            }

            const { childrenSize, lastChild } = container
            const { clientY } = locateEvent
            
            if (lastChild) {
                const lastChildRect = this.designer.getNodeRect(lastChild.id)
                // 判断是否要插到容器的末尾
                if (lastChildRect && clientY > lastChildRect.bottom) {
                    dropLocation.index = childrenSize
                } else {
                    let minDistance = Infinity
                    // 容器中最近的插入点
                    let minIndex = 0
                    for (let index = 0 ; index < childrenSize; index ++) {
                        const child = container.getChildAtIndex(index)!
                        const rect = this.designer.getNodeRect(child.id)
                        if (rect && Math.abs(rect.top - clientY) < minDistance) {
                            minDistance = Math.abs(rect.top - clientY)
                            minIndex = index
                        }
                    }
                    
                    dropLocation.index = minIndex
                }
            }

            return dropLocation
        }
    }

    private createLocationEvent = (e: DragEvent): LocationEvent => {
        return {
            dragObject: this.dragObject!,
            originalEvent: e,
            clientX: e.clientX,
            clientY: e.clientY
        }
    }
}