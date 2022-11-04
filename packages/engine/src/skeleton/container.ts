import { WidgetConfigArea, WidgetConfig } from 'vitis-lowcode-types'
import Widget from './widget/widget'
import { makeAutoObservable } from 'mobx';

export default class AreaContainer {
    readonly area: WidgetConfigArea
    items: Widget[] = [];

    constructor(area: WidgetConfigArea) {
        makeAutoObservable(this, { area: false });
        this.area = area
    }

    add(config: WidgetConfig, handle: (config: WidgetConfig) => Widget | undefined) {
        const current = this.items.find(item => item.name === config.name)
        if (!current) {
            const newItem = handle(config)
            if (newItem) {
                this.items.push(newItem)
            }
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