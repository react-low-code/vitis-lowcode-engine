import { NodeSchema, SimulatorSpec, Point } from 'vitis-lowcode-types'
import { createElement } from 'react'
import { RendererMode } from 'vitis-lowcode-renderer'
import reactInstanceCollector, { DomNode } from './reactInstanceCollector'
import { emptyPageComponent } from './emptyComponent/page'
import SimulatorRendererView from './view'
import observerData from './store'

import { render } from 'react-dom'

import { getHost, deferUtil } from './utils'

const host = getHost()

class SimulatorRenderer implements SimulatorSpec {
    private isRan: boolean = false

    constructor() {
        host.connect(this, () => {})
    }

    getClosestNodeIdByLocation = (point: Point): string | undefined => {
        // 第一步：找出包含 point 的全部 dom 节点
        const suitableContainer = new Map<string, DomNode>()
        for (const [id, domNode] of reactInstanceCollector.domNodeMap) {
            const rect = this.getNodeRect(id)
            if (!domNode || !rect) continue
            const { width, height, left, top } = rect
            if (left < point.clientX && top < point.clientY && width + left > point.clientX && height + top > point.clientY) {
                suitableContainer.set(id, domNode)
            }
        }
        // 第二步：找出离 point 最近的 dom 节点
        const minGap: {id: string| undefined; minArea: number} = {
            id: undefined,
            minArea: Infinity
        }
        for (const [id, domNode] of suitableContainer) {
            const { width, height } = domNode.rect
            if (width *  height  < minGap.minArea) {
                minGap.id = id;
                minGap.minArea = width *  height
            }
        }

        return minGap.id
    }

    getNodeRect = (nodeId: string): DOMRect | undefined => {
        return reactInstanceCollector.domNodeMap.get(nodeId)?.node.getBoundingClientRect()
    }

    rerender = async () => {
        observerData.components = host.project.designer.componentImplMap,
        observerData.schema = host.project.schema
        console.log(observerData.schema,'sss')
        await deferUtil.didRender()
    }

    run() {
        if (this.isRan) {
            return
        }

        this.isRan = true
        const container = document.createElement('div')
        container.id = 'simulatorRenderer'
        container.className = 'simulator-renderer'
        document.body.appendChild(container)

        render(
            createElement(SimulatorRendererView, {
                rendererMode: RendererMode.design,
                onCompGetRef: (schema: NodeSchema, domElement: HTMLElement | null) => {
                    reactInstanceCollector.mount(schema.id!, domElement)
                },
                customCreateElement: (schema: NodeSchema) => {
                    // todo
                    return <div></div>
                },
                emptyPageComponent
            },null),
            container
        )
    }
}

export default new SimulatorRenderer()