import React from 'react'
import { SetterCommonProps } from 'vitis-lowcode-types'

export interface Props extends SetterCommonProps {
    // 在这里写设置器特有的props
    [attr: string]: any;
}


function StringSetter(props: Props) {
    return <div></div>
}

export default {
    view: StringSetter,
    name: "StringSetter"
}