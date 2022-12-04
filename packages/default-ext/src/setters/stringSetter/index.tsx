import React from 'react'
import { SetterCommonProps } from 'vitis-lowcode-types'
import { Input } from 'antd'

export interface Props extends SetterCommonProps {
    // 在这里写设置器特有的props
    [attr: string]: any;
}


function StringSetter(props: Props) {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onChange) {
            props.onChange(event.target.value)
        }
    }

    return <Input value={props.value} onChange={onChange}/>
}

export default {
    view: StringSetter,
    name: "StringSetter"
}