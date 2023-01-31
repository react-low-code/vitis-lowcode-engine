import React, { useContext, useEffect } from "react";
import { NodeSchema } from 'vitis-lowcode-types'
import useGetDOM from '../hooks/useGetDOM'
import { PropsContext, GlobalDataContext, ContainerDataContext } from '../context'
import { Path } from 'depath'
import useHidden from '../hooks/useHidden'
import useDisabled from "../hooks/useDisabled";
import { RendererMode } from '../types'

interface Props {
    schema: NodeSchema
}

function Content(props: Props) {
    const rootRef = useGetDOM(props.schema)
    const { extraProps } = props.schema
    const propsContext = useContext(PropsContext)
    const { updateFormData, formData, pageData } = useContext(GlobalDataContext)
    const {data, dataLoading} = useContext(ContainerDataContext)
    const isDisabled = useDisabled({pageData, formData, containerData: data}, props.schema.extraProps.isDisabled)
    
    const Com = propsContext.components.get(props.schema.componentName)
    useEffect(() => {
        function getInitValue() {
            if (!dataLoading) {
                return data && extraProps.pathToVal ? Path.getIn(data, extraProps.pathToVal): props.schema.props.defaultValue
            } else {
                return undefined
            }
        }
        if (Com && extraProps.name) {
            updateFormData(extraProps.name, getInitValue())
        }
    }, [Com, dataLoading])
    if (!Com) { return <div>未知的表单组件</div> }
    const name = extraProps.name && extraProps.name.replace(/\s/g,'')
    const value = name ? Path.getIn(formData, name): undefined
    const onChange = (value: any) => {
        if (extraProps.name) { 
            updateFormData(extraProps.name, value) 
        }
    }
    return (
        <Com {...props.schema.props} ref={rootRef} value={value} onChange={onChange} disabled={isDisabled}/>
    )
}

export default function(props: Props) {
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