import { EventEmitter } from 'eventemitter3'
import { DragObject } from '../types'
import { makeAutoObservable } from 'mobx'
import type Designer from './designer'

export class Dragon {
    private emitter = new EventEmitter()
    dragging: boolean = false
    dragObject: DragObject | null = null
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
    }

    onDragOver = (e: DragEvent) => {

        this.createLocationEvent(e)
    }

    private createLocationEvent = (e: DragEvent) => {
        return {

        }
    }
}