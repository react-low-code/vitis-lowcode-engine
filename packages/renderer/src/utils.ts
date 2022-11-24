import { NodeSchema, LayoutSchema } from 'vitis-lowcode-types'

export function isLayoutComponent(schema: NodeSchema): schema is LayoutSchema {
    return schema.isContainer && schema.containerType === 'Layout'
}