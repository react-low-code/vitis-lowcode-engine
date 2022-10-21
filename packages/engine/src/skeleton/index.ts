import { WidgetBaseConfig, WidgetConfigArea } from 'vitis-lowcode-types'
import Panel from './widget/panel'
import PanelDock from './widget/panel-dock'
import Widget from './widget/widget'

export default class Skeleton {
    add(config: WidgetBaseConfig) {
        if (config.type === 'panel') {
            return new Panel(config.name, config)
        } else if (config.type === 'panelDock') {
            return new PanelDock(config.name, config)
        } else {
            return new Widget(config.name, config)
        }
    }

    remove(area: WidgetConfigArea, name: string): void {
        
    }
}