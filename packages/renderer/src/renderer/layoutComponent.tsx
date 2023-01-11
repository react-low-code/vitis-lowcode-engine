import React, { useContext } from "react";
import { LayoutSchema } from 'vitis-lowcode-types'
import useGetDOM from '../hooks/useGetDOM'
import BaseComponentRenderer from './baseComponentRenderer'
import { Context } from '../context'
import { transformStringToCSSProperties } from '../utils'

interface Props {
    schema: LayoutSchema
}

export default function LayoutComponent(props: Props) {
    const rootRef = useGetDOM(props.schema)
    const context = useContext(Context)
    const { style, ...reset } = props.schema.props
    const Component = context.components.get(props.schema.componentName)
    if (!Component) { return <div>未知的布局组件</div> }

    return (
    <Component 
        style={typeof style === 'string' ? transformStringToCSSProperties(style): undefined} 
        ref={rootRef}
        {...reset}
    >
        {!props.schema.children.length ?
        context.customEmptyElement ? context.customEmptyElement(props.schema): null
        :
        props.schema.children.map(child => <BaseComponentRenderer schema={child} key={child.id}/>)
        }
    </Component>
    )
}