import { createElement } from 'react'
import { WidgetConfig, WidgetSpec } from 'vitis-lowcode-types'
import { makeAutoObservable } from 'mobx';

export default class Widget implements WidgetSpec {
    readonly name: string
    readonly config: WidgetConfig
    visible: boolean = true

    constructor(name: string, config: WidgetConfig) {
        this.name = name
        this.config = config
        makeAutoObservable(this, {
            config: false,
            name: false
        })
    }

    get content() {
        return createElement(this.config.content, this.config.contentProps)
    }

    hide(): void {
        this.visible = false
    }

    show(): void {
        this.visible = true
    }

    toggle(): void {
        this.visible = !this.visible
    }
}