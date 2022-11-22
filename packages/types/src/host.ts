import type { IReactionPublic, IReactionOptions } from 'mobx';
import { ObservableProjectSpec } from './project'
import { Point } from 'vitis-lowcode-types'


/** 这是模拟器要提供给设计器的方法*/
export interface SimulatorSpec {
    /**
     * 装载渲染器
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
}

/**这是设计器器要给模拟器提供的方法 */
export interface HostSpec {
    /**
     * 将 SimulatorRenderer 实例传递给 host
     * @param renderer 
     * @param effect 
     * @param options 
     */
    connect(
        renderer: SimulatorSpec, 
        effect: (reaction: IReactionPublic) => void,
        options?: IReactionOptions<any, boolean>,
    ): void
    
    /**
     * 设计器环境的 Project 实例
     */
    project: ObservableProjectSpec
}