import { createElement } from 'react'
import { render } from 'react-dom'
import { defaultPlugins, defaultSetters } from 'vitis-lowcode-default-ext'
import { PageSchema } from 'vitis-lowcode-types'

import { plugins, setters, material, project } from './shell'
import Workbench from './layout/workbench'
import { observableSkeleton, observableProject } from './shell'
import { ASSET_UPDATED } from './eventType'


export { setters, skeleton, plugins, material, project } from './shell'
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

export interface EngineOptions {
    pageSchema?: PageSchema
}

export function init(container?: HTMLElement, options: EngineOptions = {}) {
    if (!container) {
        container = document.createElement('div')
        container.id = 'vitis-engine'
        document.body.appendChild(container)
    }
    if (options.pageSchema) {
        project.project.setSchema(options.pageSchema)
    }
    
    render(createElement(Workbench, {
        skeleton: observableSkeleton,
        project: observableProject
    }),container)
}