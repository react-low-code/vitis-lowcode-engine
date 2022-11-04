import { WidgetSpec, WidgetConfig } from 'vitis-lowcode-types'
import { createElement } from 'react'

export default abstract class BaseWidget implements WidgetSpec {
    readonly name: string
    readonly config: WidgetConfig
    visible: boolean = true

    constructor(name: string, config: WidgetConfig) {
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