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
  const reg = /("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n|$))|(\/\*(\n|.)*?\*\/)/g;
  // 去掉代码中的注释，代码开头有注释会导致 new Function 返回 undefined
  str = str.replace(reg, function(word) { 
      // 去除注释后的文本 
    return /^\/{2,}/.test(word) || /^\/\*/.test(word) ? "" : word; 
  });
  // 去掉代码前后的空格，
  str = str.trim()

  return new Function(`"use strict"; return ${str}`)();
}