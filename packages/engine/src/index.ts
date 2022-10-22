export * from './shell'
import { exPlugin } from 'vitis-lowcode-default-plugins'
import { plugins } from './shell'

(async function registerPlugins() {
    plugins.register(exPlugin)
})()

export function init(container?: HTMLElement): Promise<void> {
    return Promise.resolve()
}