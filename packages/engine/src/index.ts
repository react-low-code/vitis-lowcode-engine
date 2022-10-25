import { createElement } from 'react'
import { render } from 'react-dom'

export { setters, skeleton, plugins, project, material } from './shell'
import { exPlugin } from 'vitis-lowcode-default-plugins'
import { plugins } from './shell'
import Workbench from './layout/workbench'
import { observableSkeleton } from './shell'

(async function registerPlugins() {
    plugins.register(exPlugin)
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