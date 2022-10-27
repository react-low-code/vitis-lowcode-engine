import { createElement } from 'react'
import { render } from 'react-dom'

import { project } from './shell'
import Workbench from './layout/workbench'
import { observableSkeleton, observableProject } from './shell'
import { ASSET_UPDATE } from './eventType'

export { setters, skeleton, plugins, project, material } from './shell'
export * from './eventType'


// import { PluginContext } from 'vitis-lowcode-types'

(async function registerPlugins() {
    project.on(ASSET_UPDATE, (loadedPackageNames: string[]) => {
        observableProject.designer.buildComponentSpecMap(loadedPackageNames)
    })
})()

export function init(container?: HTMLElement) {
    if (!container) {
        container = document.createElement('div')
        container.id = 'vitis-engine'
        document.body.appendChild(container)
    }

    render(createElement(Workbench, {
        skeleton: observableSkeleton
    }),container)
}