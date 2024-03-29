import React, { useContext } from "react";
import { NodeSchema } from 'vitis-lowcode-types'
import useGetDOM from '../hooks/useGetDOM'
import { PropsContext, GlobalDataContext, ContainerDataContext } from '../context'
import useHidden from '../hooks/useHidden'
import { RendererMode } from '../types'
import useGetInitVal from '../hooks/useGetInitVal'
import { generateAttrs } from '../generateAttr'

interface Props {
    schema: NodeSchema
}

function Content(props: Props) {
    const rootRef = useGetDOM(props.schema)
    const context = useContext(PropsContext)
    const Com = context.components.get(props.schema.componentName)
    if (!Com) { return <div>未知的组件</div> }
    const attrs = generateAttrs(props.schema.props)
    const value = useGetInitVal(props.schema.extraProps, props.schema.props.defaultValue)
    return (
        <Com {...attrs}  ref={rootRef} value={value}/>
    )
}

export default function UIComponent(props: Props) {
    const { formData, pageData } = useContext(GlobalDataContext)
    const {data} = useContext(ContainerDataContext)
    const propsContext = useContext(PropsContext)
    const isHidden = useHidden({pageData, formData, containerData: data}, props.schema.extraProps.isHidden)
    if (isHidden && propsContext.rendererMode !== RendererMode.design) {
        return null
    }

    if (isHidden && propsContext.rendererMode === RendererMode.design) {
        return <div style={{opacity: 0.1}} ><Content {...props}/></div>
    }

    return <Content {...props}/>
}