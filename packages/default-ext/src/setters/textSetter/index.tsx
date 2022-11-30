import React from 'react'
import { SetterCommonProps } from 'vitis-lowcode-types'

export interface Props extends SetterCommonProps {
    // 在这里写设置器特有的props
    style?: React.CSSProperties;
    [attr: string]: any;
}


function TextSetter(props: Props) {
    return <div style={props.style}>{props.value}</div>
}

export default {
    view: TextSetter,
    name: "TextSetter"
}