import type { IReactionPublic } from 'mobx';
import { ObservableProjectSpec } from './project'
import { Point } from 'vitis-lowcode-types'


/** 这是渲染器环境提供给设计器环境的方法*/
export interface SimulatorSpec {
    /**
     * 渲染画布
     */
    run(): void
    /**
     * 获取离定位点最近的 Node
     * @param point 
     */
    getClosestNodeIdByLocation(point: Point): string | undefined
    /**
     * 获取给定 Node 在浏览器窗口中的位置
     * @param id 
     */
    getNodeRect(id: string): DOMRect | undefined
    /**
     * 重新渲染
     */
    rerender(): Promise<void>
    /**
     * 获取 DOM 元素的 Node id
     * @param elem 
     */
    getNodeIdByDOMElem(elem: HTMLElement): string | undefined
}

/**这是设计器环境给渲染器环境提供的方法 */
export interface HostSpec {
    
    /**
     * 设计器环境的 Project 实例
     */
    project: ObservableProjectSpec
}