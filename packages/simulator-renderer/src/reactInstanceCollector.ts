import { ReactInstance } from "react"

export interface DomNode {
    node: HTMLElement;
    rect: DOMRect
}

class ReactInstanceCollector {
    // reactInstanceMap: Map<string, ReactInstance | null> = new Map()
    domNodeMap: Map<string, DomNode | null> = new Map()

    mount(id: string, domElement: HTMLElement | null){
        // this.reactInstanceMap.set(id, instance)
        if (domElement) {
            this.domNodeMap.set(id, {
                node: domElement,
                rect: domElement.getBoundingClientRect()
            })
        } else {
            this.domNodeMap.set(id, null)
        }

    }
}

export default new ReactInstanceCollector()