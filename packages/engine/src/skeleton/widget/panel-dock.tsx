import { ReactNode } from 'react'
import { PanelDockSpec, WidgetBaseConfig } from 'vitis-lowcode-types'

export default class PanelDock implements PanelDockSpec {
    readonly isPanelDock: true = true
    readonly name: string
    readonly config: WidgetBaseConfig
    disabled: boolean = false
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