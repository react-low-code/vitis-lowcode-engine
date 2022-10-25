import { BaseWidgetSpec, WidgetBaseConfig } from 'vitis-lowcode-types'
import { createElement } from 'react'
import { makeAutoObservable } from 'mobx';

export default abstract class BaseWidget implements BaseWidgetSpec {
    readonly name: string
    readonly config: WidgetBaseConfig
    visible: boolean = true

    constructor(name: string, config: WidgetBaseConfig) {
        makeAutoObservable(this)
        this.name = name
        this.config = config
    }

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