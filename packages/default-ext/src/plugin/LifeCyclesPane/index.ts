import { PluginContext } from 'vitis-lowcode-types'
import Pane from './component'

function LifeCyclesPane(ctx: PluginContext) {
    return {
        init() {
            ctx.skeleton.add({
                name: "LifeCyclesPane",
                content: Pane,
                area: "left"
            })
        }
    }
}

LifeCyclesPane.pluginName = 'LifeCyclesPane'

export default LifeCyclesPane