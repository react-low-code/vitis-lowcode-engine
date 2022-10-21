import { ReactNode } from 'react'
import { WidgetSpec, WidgetBaseConfig } from 'vitis-lowcode-types'

export default class Panel implements WidgetSpec {
    readonly isWidget: true
    readonly name: string
    readonly config: WidgetBaseConfig
    visible: boolean = true

    constructor(name: string, config: WidgetBaseConfig) {
        this.name = name
        this.config = config
    }

    getName(): string {
        return this.name
    }

    get content(): ReactNode {
        return <div></div>
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