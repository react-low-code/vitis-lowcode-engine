import React from 'react'
import { SetterCommonProps } from 'vitis-lowcode-types'
import { Input } from 'antd'

export interface Props extends SetterCommonProps {
    // 在这里写设置器特有的props
    [attr: string]: any;
}


function StringSetter(props: Props) {
    return <Input value={props.value} onChange={props.onChange}/>
}

export default {
    view: StringSetter,
    name: "StringSetter"
}