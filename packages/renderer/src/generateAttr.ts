import { NodeSchema } from 'vitis-lowcode-types'
import { isJSFunction,transformStringToFunction,isJSDataSource } from './utils'

type Attrs = {
    style?: React.CSSProperties
    [attr: string]: any
}

type Map  = {
    [attr: string]: any
}

function generateStyle(result: Attrs,str?: string) {
    if(!str) return result

    const style: any = {}
    str = str.replace(/\S\s/g,'')
    str.split(';').forEach(item => {
      const [key, value] = item.split(':')
      if (key && value) {
        style[key] = value
      }
    })
    result.style = style

    return result
}

function generateFunction(result: Attrs,props: Map) {
    for(const key of Object.keys(props)) {
        const val = props[key]
        if(isJSFunction(val) && val.value) {
            result[key] = transformStringToFunction(val.value)
        }
    }

    return result
}

function generateJSDataSource(result: Attrs,props:Map) {
    for(const key of Object.keys(props)) {
        const val = props[key]
        if(isJSDataSource(val) && val.value) {
            result[key] = generateAttrs(val.value)
        }
    }

    return result
}

function generateBaseAttr(result: Attrs,props:Map) {
    for(const key of Object.keys(props)) {
        const val = props[key]
        if(val === null || typeof val !== 'object') {
            result[key] = val
        }
    }

    return result
}

function generatePlainObject(result: Attrs,props:Map) {
    for(const key of Object.keys(props)) {
        const val = props[key]
        if(val !== null && typeof val === 'object' && !isJSDataSource(val) && !isJSFunction(val)) {
            result[key] = val
        }
    }

    return result
}

function generateJSON(result: Attrs,props: Map) {
    for(const key of Object.keys(props)) {
        const val = props[key],len = val?.length
        if(val && typeof val === 'string' && 
            ((val[0] === '[' && val[len - 1] === ']') || (val[0] === '{' && val[len -1] === '}'))
        ) {
            result[key] = JSON.parse(val)
        }
    }

    return result
}

export function generateAttrs(props: NodeSchema['props']):Attrs {
    const attrs: Attrs = {}
    const { style,...other } = props
    generateStyle(attrs, style as string)
    generateFunction(attrs, other)
    generateJSDataSource(attrs,other)
    generateBaseAttr(attrs,other)
    generatePlainObject(attrs,other)
    generateJSON(attrs,other)

    return attrs
}