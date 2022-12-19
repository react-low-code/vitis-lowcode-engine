import React, { useEffect, useState } from 'react'
import { SetterCommonProps } from 'vitis-lowcode-types'
import Background from './background'

function transformStringToCSSProperties(str: string) {
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

interface Props extends SetterCommonProps {
    // 在这里写设置器特有的props
    value: string | undefined
}

function StyleSetter(props: Props) {
    const [formatVal, setFormatVal] = useState<React.CSSProperties>({})
    useEffect(() => {
        setFormatVal(props.value?transformStringToCSSProperties(props.value):{})
    }, [props.value]);

    const onChange = (name: string) => (value?: string | number) => {
        const newValue = {
            ...formatVal,
            [name]: value
        } as any
        let result = ''
        for (const key in newValue) {
            if (Object.prototype.hasOwnProperty.call(newValue, key)) {
                const element = newValue[key];
                result +=`${key}:${element};`
            }
        }

        if (props.onChange) {
            props.onChange(result)
        }
    }

    return (
        <div>
            <Background 
                background={formatVal.backgroundColor || formatVal.background} 
                onChange={onChange('background')}
            />
        </div>
    )
}

export default {
    view: StyleSetter,
    name: "StyleSetter"
}

