import { PluginContext } from 'vitis-lowcode-types'
import Pane from './component'

function PromptPane(ctx: PluginContext) {
    return {
        init() {
            ctx.skeleton.add({
                name: "PromptPane",
                content: Pane,
                area: "left"
            })
        }
    }
}

PromptPane.pluginName = 'PromptPane'

export default PromptPane