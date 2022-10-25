import { WidgetConfigArea, BaseWidgetSpec, WidgetBaseConfig } from 'vitis-lowcode-types'
import { makeAutoObservable } from 'mobx';

export default class AreaContainer<C extends WidgetBaseConfig, W extends BaseWidgetSpec> {
    readonly area: WidgetConfigArea
    items: W[] = [];

    constructor(area: WidgetConfigArea ) {
        makeAutoObservable(this, { area: false });
        this.area = area
    }

    add(config: C, handle: (config: C) => W) {
        const current = this.items.find(item => item.name === config.name)
        if (!current) {
            const newItem = handle(config)
            this.items.push(newItem)
            return newItem
        } else {
            console.warn(`${this.area} 已存在一个名为 ${config.name} 的元素，新增无效`)
            return current
        }
    }

    remove(name: string): boolean {
        this.items = this.items.filter(item => item.name !== name)

        return true
    }
}