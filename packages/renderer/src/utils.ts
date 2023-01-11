import { NodeSchema, LayoutSchema } from 'vitis-lowcode-types'

export function isLayoutComponent(schema: NodeSchema): schema is LayoutSchema {
    return schema.isContainer && schema.containerType === 'Layout'
}

export function isBUComponent(schema: NodeSchema): schema is NodeSchema {
  return !schema.isContainer
}

export function transformStringToCSSProperties(str: string) {
    const result: any = {}
    str = str.replace(/\S\s/g,'')
    str.split(';').forEach(item => {
      const [key, value] = item.split(':')
      if (key && value) {
        result[key] = value
      }
    })
    
    return result as React.CSSProperties
}

export function transformStringToFunction(str: string) {
  return new Function(`"use strict"; return ${str}`)();
}