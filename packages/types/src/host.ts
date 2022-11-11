import type { IReactionDisposer, IReactionPublic, IReactionOptions } from 'mobx';
/** 这是模拟器要提供给设计器的方法*/
export interface SimulatorSpec {
    run(): void
}

/**这是设计器器要给模拟器提供的方法 */
export interface DesignerSpec {
    connect(
        renderer: SimulatorSpec, 
        effect: (reaction: IReactionPublic) => void,
        options?: IReactionOptions<any, boolean>,
    ): void
}