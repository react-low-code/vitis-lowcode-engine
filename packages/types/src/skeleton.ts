import type { ElementType, ReactNode } from 'react'

export interface SkeletonSpec {
    add(config: WidgetConfig): WidgetSpec | undefined;
    remove(area: WidgetConfigArea, name: string): boolean
}

export interface WidgetConfig {
    name: string;
    area: WidgetConfigArea;
    content: ElementType<any>;
    contentProps?: Record<string, any>;
    [extra: string]: any;
}

export type WidgetConfigArea = 'left' | 'toolbar' | 'bottom' | 'topLeft' | 'topCenter' | 'topRight'

export interface WidgetSpec {
    readonly name: string;
    readonly content: ReactNode;
    visible: boolean;
    readonly config: WidgetConfig;

    show(): void;
    hide(): void;
    toggle(): void;
}