import React, { useContext } from "react";
import { NodeSchema } from 'vitis-lowcode-types'
import useGetDOM from '../hooks/useGetDOM'
import { Context } from '../context'
import { RendererMode } from '../types'

interface Props {
    schema: NodeSchema
}

export default function FormControl(props: Props) {
    const rootRef = useGetDOM(props.schema)
    const context = useContext(Context)
    const Com = context.components.get(props.schema.componentName)
    console.log(context.components, 'context.components')
    return (
    <div 
        ref={rootRef} 
        data-node-id={props.schema.id} 
        draggable={context.rendererMode === RendererMode.design}
    >
        {Com?<Com {...props.schema.props}/>:'未知的表单组件'}
    </div>
    )
}