import type { IReactionPublic, IReactionOptions } from 'mobx';
import { ObservableProjectSpec } from './project'
import { Point } from 'vitis-lowcode-types'


/** 这是模拟器要提供给设计器的方法*/
export interface SimulatorSpec {
    run(): void
    /**
     * 获取离定位点最近的 Node
     * @param point 
     */
    getClosestNodeIdByLocation(point: Point): string | undefined
    getNodeRect(id: string): DOMRect | undefined
}

/**这是设计器器要给模拟器提供的方法 */
export interface HostSpec {
    connect(
        renderer: SimulatorSpec, 
        effect: (reaction: IReactionPublic) => void,
        options?: IReactionOptions<any, boolean>,
    ): void

    project: ObservableProjectSpec
}