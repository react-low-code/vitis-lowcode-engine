import React, { useContext } from "react";
import { NodeSchema } from 'vitis-lowcode-types'
import useGetDOM from '../hooks/useGetDOM'
import { PropsContext, GlobalDataContext, ContainerDataContext } from '../context'
import useHidden from '../hooks/useHidden'
import useDisabled from "../hooks/useDisabled";
import { RendererMode } from '../types'
import useSetFormControlVal from '../hooks/useSetFormControlVal'
import useSetFormErrors from '../hooks/useSetFormErrors'

interface Props {
    schema: NodeSchema
}

function Content(props: Props) {
    const rootRef = useGetDOM(props.schema)
    const { extraProps } = props.schema
    const propsContext = useContext(PropsContext)
    const { updateFormData, formData, pageData } = useContext(GlobalDataContext)
    const { data } = useContext(ContainerDataContext)
    const isDisabled = useDisabled({pageData, formData, containerData: data}, props.schema.extraProps.isDisabled)
    const name = extraProps.name && extraProps.name.replace(/\s/g,'')
    const error = useSetFormErrors(props.schema.extraProps)
    
    const Com = propsContext.components.get(props.schema.componentName)
    if (!Com) { return <div>未知的表单组件</div> }
    
    const value = useSetFormControlVal(props.schema.extraProps, props.schema.props.defaultValue)
    const onChange = (val: any) => {
        if (name) { 
            updateFormData(name, val) 
        }
    }
    return (
        <div>
            <Com {...props.schema.props} ref={rootRef} value={value} onChange={onChange} disabled={isDisabled}/>
            {error && <div style={{color: 'red', fontSize: '14px'}}>{error}</div>}
        </div>
    )
}

export default function FormControl(props: Props) {
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