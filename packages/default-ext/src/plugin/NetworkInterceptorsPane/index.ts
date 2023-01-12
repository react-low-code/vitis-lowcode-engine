import { PluginContext } from 'vitis-lowcode-types'
import Pane from './component'

function NetworkInterceptorsPane(ctx: PluginContext) {
    return {
        init() {
            ctx.skeleton.add({
                name: "NetworkInterceptorsPane",
                content: Pane,
                area: "left"
            })
        }
    }
}

NetworkInterceptorsPane.pluginName = 'defaultNetworkInterceptorsPane'

export default NetworkInterceptorsPane