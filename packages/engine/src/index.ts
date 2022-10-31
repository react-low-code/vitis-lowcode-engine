import { createElement } from 'react'
import { render } from 'react-dom'
import ComponentsPane from 'vitis-lowcode-components-pane'

import { plugins, project, skeleton } from './shell'
import Workbench from './layout/workbench'
import { observableSkeleton, observableProject } from './shell'
import { ASSET_UPDATE } from './eventType'


export { setters, skeleton, plugins, project, material } from './shell'
export * from './eventType'

(async function registerPlugins() {
    project.on(ASSET_UPDATE, (loadedPackageNames: string[]) => {
        observableProject.designer.buildComponentSpecMap(loadedPackageNames)
    })
    
    skeleton.add({
        type: "panelDock",
        name: "ComponentsPane",
        content: ComponentsPane,
        area: "left",
        contentProps: {
            active: false
        }
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