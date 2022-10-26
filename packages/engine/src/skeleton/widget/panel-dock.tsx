import { createElement } from 'react'
import { WidgetBaseConfig } from 'vitis-lowcode-types'
import { makeAutoObservable } from 'mobx';
export default class PanelDock{
    readonly isPanelDock: true = true
    disabled: boolean = false

    constructor(name: string, config: WidgetBaseConfig) {
        this.name = name
        this.config = config
        makeAutoObservable(this, {
            isPanelDock: false,
            config: false,
            name: false
        })
    }

    readonly name: string
    readonly config: WidgetBaseConfig
    visible: boolean = true

    getName(): string {
        return this.name
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