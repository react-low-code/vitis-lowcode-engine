import { Props } from './renderer'

export type IRendererProps = Omit<Props,'interceptors'>
export { default as Renderer } from './renderer'
export { RendererMode } from './types'
