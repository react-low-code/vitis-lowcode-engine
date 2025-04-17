import { createElement } from 'react'
import { render } from 'react-dom'
import { defaultPlugins, defaultSetters } from 'vitis-lowcode-default-ext'
import { PageSchema } from 'vitis-lowcode-types'
import { fetchSchema } from './servers/ai';

import { plugins, setters, material } from './shell'
import Workbench from './layout/workbench'
import { observableSkeleton, observableProject } from './shell'
import { ASSET_UPDATED } from './eventType'
import { PageComponentsSpec } from './defaultConfig/asset'
import Root from './root'


export { setters, skeleton, plugins, material, project, dragon } from './shell'
export * from './eventType'

(async function () {
    material.on(ASSET_UPDATED, (loadedPackageNames: string[]) => {
        observableProject.designer.buildComponentSpecMap(loadedPackageNames)
    })
    
    defaultPlugins.forEach(defaultPlugin => {
        plugins.register(defaultPlugin)
    })

    setters.register(defaultSetters)

    // Page 组件是页面的 root，它不会显示在组件面板中
    material.addComponentSpec('Page', PageComponentsSpec)
    observableProject.designer.buildComponentSpecMap(['Page'])
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
        observableProject.setSchema(options.pageSchema)
    }

    // fetchSchema().then((schema) => {
    //     observableProject.documentModel.insertSchema(schema);
    // })
    
    render(createElement(Root),container)
}