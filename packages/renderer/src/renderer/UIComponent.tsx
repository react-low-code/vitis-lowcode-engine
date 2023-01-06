import React, { useContext } from "react";
import { NodeSchema } from 'vitis-lowcode-types'
import useGetDOM from '../hooks/useGetDOM'
import { Context } from '../context'

interface Props {
    schema: NodeSchema
}

export default function UIComponent(props: Props) {
    const rootRef = useGetDOM(props.schema)
    const context = useContext(Context)
    const Com = context.components.get(props.schema.componentName)
    if (!Com) {
        return <div>未知的组件</div>
    }
    return (
        <Com {...props.schema.props} ref={rootRef} />
    )
}