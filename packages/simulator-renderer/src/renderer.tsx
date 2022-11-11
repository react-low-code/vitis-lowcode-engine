import { makeAutoObservable } from 'mobx'
import { SimulatorSpec } from 'vitis-lowcode-types'
import { createElement } from 'react'
import { render } from 'react-dom'

import { getHost } from './utils'

const host = getHost()

class SimulatorRenderer implements SimulatorSpec {

    private isRan: boolean = false
    constructor() {
        makeAutoObservable(this)
        host.connect(this, () => {
            console.log(host.project.designer.componentImplMap)
        })
        
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
            createElement('div', {},'ddd'),
            container
        )
    }
}

export default new SimulatorRenderer()