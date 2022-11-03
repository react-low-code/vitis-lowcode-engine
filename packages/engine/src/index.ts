import { createElement } from 'react'
import { render } from 'react-dom'
import { defaultPlugins, defaultSetters } from 'vitis-lowcode-default-ext'

import { plugins, setters, material } from './shell'
import Workbench from './layout/workbench'
import { observableSkeleton, observableProject } from './shell'
import { ASSET_UPDATED } from './eventType'


export { setters, skeleton, plugins, material } from './shell'
export * from './eventType'

(async function registerPlugins() {
    material.on(ASSET_UPDATED, (loadedPackageNames: string[]) => {
        observableProject.designer.buildComponentSpecMap(loadedPackageNames)
    })
    
    defaultPlugins.forEach(defaultPlugin => {
        plugins.register(defaultPlugin)
    })

    setters.register(defaultSetters)
    
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