export interface DomNode {
    node: HTMLElement;
    rect: DOMRect
}

class ReactDomCollector {
    domNodeMap: Map<string, DomNode | null> = new Map()

    mount(id: string, domElement: HTMLElement | null){
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

export default new ReactDomCollector()