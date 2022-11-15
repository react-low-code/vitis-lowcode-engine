import { makeAutoObservable } from 'mobx'
import { NodeSchema, SimulatorSpec } from 'vitis-lowcode-types'
import { createElement, ReactInstance } from 'react'
import { Renderer, RendererMode } from 'vitis-lowcode-renderer'
import reactInstanceCollector from './reactInstanceCollector'

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

    run() {
        if (this.isRan) {
            return
        }

        this.isRan = true
        const container = document.createElement('div')
        container.id = 'simulator-renderer'
        document.body.appendChild(container)

        render(
            createElement(Renderer, {
                schema: this.schema,
                components: this.components,
                rendererMode: RendererMode.design,
                onCompGetRef: (schema: NodeSchema, instance: ReactInstance | null) => {
                    reactInstanceCollector.mount(schema.id!, instance)
                },
                customCreateElement: (schema: NodeSchema) => {
                    // todo
                    return <div></div>
                }
            },null),
            container
        )
    }
}

export default new SimulatorRenderer()