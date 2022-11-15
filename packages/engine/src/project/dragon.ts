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
            designer: false
        })

        this.designer = designer
    }


    bindDrag = (event: DragEvent, dragObject: DragObject) => {
        this.dragging = true
        console.log('dragging true')
    }

    bindDrop = (event: DragEvent) => {
        this.dragging = false
        console.log('dragging false')
    }
}