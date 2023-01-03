import React, { useContext } from "react";
import { LayoutSchema } from 'vitis-lowcode-types'
import useGetDOM from '../hooks/useGetDOM'
import BaseComponentRenderer from './baseComponentRenderer'
import { Context } from '../context'
import { RendererMode } from '../types'
import { transformStringToCSSProperties } from '../utils'

interface Props {
    schema: LayoutSchema
}

export default function LayoutComponent(props: Props) {
    const rootRef = useGetDOM(props.schema)
    const context = useContext(Context)
    const { style } = props.schema.props
    const Component = context.components.get(props.schema.componentName)
    if (!Component) {
        return <div>组件正在加载...</div>
    }

    return (
    <div 
        ref={rootRef} 
        data-node-id={props.schema.id} 
        draggable={context.rendererMode === RendererMode.design}
    >
        <Component style={typeof style === 'string' ? transformStringToCSSProperties(style): undefined}>
            {!props.schema.children.length ?
            context.customEmptyElement ? context.customEmptyElement(props.schema): null
            :
            props.schema.children.map(child => <BaseComponentRenderer schema={child} key={child.id}/>)
            }
        </Component>
        
    </div>
    )
}