import { makeAutoObservable } from 'mobx'
import { NodeSchema, SimulatorSpec, Point } from 'vitis-lowcode-types'
import { createElement, ReactInstance } from 'react'
import { Renderer, RendererMode } from 'vitis-lowcode-renderer'
import reactInstanceCollector, { DomNode } from './reactInstanceCollector'
import { emptyPageComponent } from './emptyComponent/page'

import { render } from 'react-dom'

import { getHost } from './utils'

const host = getHost()

class SimulatorRenderer implements SimulatorSpec {
    private isRan: boolean = false

    get components() {
        return host.project.designer.componentImplMap
    }

    get schema() {
        return host.project.schema
    }
    constructor() {
        makeAutoObservable(this)
        host.connect(this, () => {})
    }

    getClosestNodeIdByLocation = (point: Point): string | undefined => {
        // 第一步：找出包含 point 的全部 dom 节点
        const suitableContainer = new Map<string, DomNode>()
        for (const [id, domNode] of reactInstanceCollector.domNodeMap) {
            if (!domNode) continue
            const { width, height, left, top } = domNode.rect
            if (left < point.clientX && top < point.clientY && width + left > point.clientX && height + top > point.clientY) {
                suitableContainer.set(id, domNode)
            }
        }

        // 第二步：找出离 point 最近的 dom 节点
        const minGap: {id: string| undefined; minLeft: number} = {
            id: undefined,
            minLeft: Infinity
        }
        for (const [id, domNode] of suitableContainer) {
            const { left } = domNode.rect
            if (point.clientX - left < minGap.minLeft) {
                minGap.id = id;
                minGap.minLeft = point.clientX - left
            }
        }

        return minGap.id
    }

    getNodeRect = (nodeId: string): DOMRect | undefined => {
        return reactInstanceCollector.domNodeMap.get(nodeId)?.rect
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
            createElement(Renderer, {
                schema: this.schema,
                components: this.components,
                rendererMode: RendererMode.design,
                onCompGetRef: (schema: NodeSchema, instance: ReactInstance | null, domElement: HTMLElement | null) => {
                    reactInstanceCollector.mount(schema.id!, instance, domElement)
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