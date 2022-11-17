import { Point } from 'vitis-lowcode-types'

export default class Viewport {
    viewportElement?: HTMLElement
    mount(ele: HTMLElement | null) {
        if (!ele || ele === this.viewportElement) {
            return
        }
        
        this.viewportElement = ele
    }

    toGlobalPoint(point: Point) {
        if (!this.viewportElement) {
            return point
        }
        const bound = this.viewportElement.getBoundingClientRect()
        return {
            clientX: bound.left + point.clientX,
            clientY: bound.top + point.clientY
        }
    }
}