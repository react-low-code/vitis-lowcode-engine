import { WidgetConfig, WidgetConfigArea } from 'vitis-lowcode-types'
import Widget from './widget/widget'
import AreaContainer from './container'

export default class Skeleton {
    leftArea = new AreaContainer('left')
    toolbarArea = new AreaContainer('toolbar')
    bottomArea = new AreaContainer('bottom')
    topLeftArea = new AreaContainer('topLeft')
    topRightArea = new AreaContainer('topRight')
    topCenterArea = new AreaContainer('topCenter')

    add(config: WidgetConfig) {
        const handle = (config: WidgetConfig) => {
            return new Widget(config.name, config)
        }
        switch (config.area) {
            case 'bottom':
                return this.bottomArea.add(config, handle)
            case 'left':
                return this.leftArea.add(config, handle)
            case 'toolbar':
                return this.toolbarArea.add(config, handle)
            case 'topCenter':
                return this.topCenterArea.add(config, handle)
            case 'topLeft':
                return this.topLeftArea.add(config, handle)
            case 'topRight':
                return this.topRightArea.add(config, handle)
            default:
                const n: never = config.area;
                console.warn(`${n} 不是 never 类型`)
        }
        
    }

    remove(area: WidgetConfigArea, name: string): boolean {
        switch (area) {
            case 'bottom':
                return this.bottomArea.remove(name)
            case 'left':
                return this.leftArea.remove(name)
            case 'toolbar':
                return this.toolbarArea.remove(name)
            case 'topCenter':
                return this.topCenterArea.remove(name)
            case 'topLeft':
                return this.topLeftArea.remove(name)
            case 'topRight':
                return this.topRightArea.remove(name)
            default:
                const n: never = area;
                console.warn(`${n} 不是 never 类型`)
                return false
        }
    }
}