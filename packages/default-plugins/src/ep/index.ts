import { PluginContext } from 'vitis-lowcode-types'

function exPlugin(context: PluginContext, options: any) {
    return {
        init() {
            // 在这里调用 context 上的 API 往低代码引擎添加功能
        },
        destroy() {
            // 插件被销毁时调用
        }
    }
}

// 插件名在整个引擎中要唯一
exPlugin.pluginName = 'ExPlugin'

export default exPlugin