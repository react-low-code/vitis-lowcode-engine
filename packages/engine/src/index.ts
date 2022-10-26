import { createElement } from 'react'
import { render } from 'react-dom'

export { setters, skeleton, plugins, project, material } from './shell'
import { exPlugin } from 'vitis-lowcode-default-plugins'
import { plugins } from './shell'
import Workbench from './layout/workbench'
import { observableSkeleton } from './shell'

import { PluginContext } from 'vitis-lowcode-types'

(async function registerPlugins() {
    plugins.register(exPlugin)
    function addTopLeft(ctx: PluginContext) {
        return {
            init() {
                ctx.skeleton.add({
                    name: 'logo',
                    area: "topRight",
                    content: () => createElement('div', {}, 'div'),
                    type: 'widget'
                })

                ctx.skeleton.add({
                    name: 'bottom',
                    area: "topRight",
                    content: () => createElement('div', {}, 'divbbb'),
                    type: 'widget'
                })

            }
        }
    }

    addTopLeft.pluginName = 'addTopLeft'
    plugins.register(addTopLeft)

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