import { ComponentType, ReactNode } from 'react'

export interface SkeletonSpec {
    add(config: WidgetBaseConfig): PanelSpec | PanelDockSpec | WidgetSpec;
    remove(area: WidgetConfigArea, name: string): void
}

export interface WidgetBaseConfig {
    /**
     * widget：将内容直接渲染上对应的区域。
     * panelDock：由作用点（通常是图标）和面板组成，点击作用点可以控制面板的显示和隐藏。
     * panel：将内容渲染在面板上，面板的宽度可变。
     */
    type: 'panel' | 'panelDock' | 'widget';
    name: string;
    area: WidgetConfigArea;
    content: ComponentType<any>;
    contentProps?: Record<string, any>;
    [extra: string]: any;
}

export type WidgetConfigArea = 'left' | 'right' | 'main' | 'toolbar' | 'bottom' | 'topLeft' | 'topCenter' | 'topRight'

export interface PanelSpec extends BaseWidget{
    readonly isPanel: true;
}

export interface PanelDockSpec extends BaseWidget{
    readonly isPanelDock: true
    disabled: boolean;
}

export interface WidgetSpec extends BaseWidget {
    readonly isWidget: true
}

export interface BaseWidget {
    readonly name: string;
    readonly content: ReactNode;
    visible: boolean;
    // readonly body: ReactNode;
    readonly config: WidgetBaseConfig;
  
    getName(): string;
    show(): void;
    hide(): void;
    toggle(): void;
}