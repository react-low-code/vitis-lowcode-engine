import React, { useContext, useEffect } from "react";
import { NodeSchema } from 'vitis-lowcode-types'
import useGetDOM from '../hooks/useGetDOM'
import { PropsContext, GlobalDataContext, ContainerDataContext } from '../context'
import { Path } from 'depath'

interface Props {
    schema: NodeSchema
}

export default function FormControl(props: Props) {
    const rootRef = useGetDOM(props.schema)
    const { extraProps } = props.schema
    const propsContext = useContext(PropsContext)
    const { updateFormData, formData } = useContext(GlobalDataContext)
    const {data, dataLoading} = useContext(ContainerDataContext)
    
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
    const value = extraProps.name ? Path.getIn(formData, extraProps.name): undefined
    const onChange = (value: any) => {
        if (extraProps.name) { 
            updateFormData(extraProps.name, value) 
        }
    }
    return (
        <Com {...props.schema.props} ref={rootRef} value={value} onChange={onChange}/>
    )
}