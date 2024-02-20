import { PluginContext } from 'vitis-lowcode-types'
import Pane from './component'

function SchemaPane(ctx: PluginContext) {
    return {
        init() {
            ctx.skeleton.add({
                name: "SchemaPane",
                content: Pane,
                area: "left"
            })
        }
    }
}

SchemaPane.pluginName = 'SchemaPane'

export default SchemaPane