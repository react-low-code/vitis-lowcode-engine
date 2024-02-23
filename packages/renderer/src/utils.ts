import { NodeSchema, LayoutSchema,JSFunction,PropValue, JSDataSource } from 'vitis-lowcode-types'

export function isLayoutComponent(schema: NodeSchema): schema is LayoutSchema {
    return schema.isContainer && schema.containerType === 'Layout'
}

export function isBUComponent(schema: NodeSchema): schema is NodeSchema {
  return !schema.isContainer
}

export function isJSFunction(val: PropValue): val is JSFunction {
  return !!val && (val as any).type === 'JSFunction'
}

export function isJSDataSource(val: PropValue):val is JSDataSource {
  return !!val && (val as any).type === 'DataSource'
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