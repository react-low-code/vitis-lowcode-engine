import React, { useContext } from "react";
import { LayoutSchema } from 'vitis-lowcode-types'
import useGetDOM from '../hooks/useGetDOM'
import useDataSource from '../hooks/useDataSource'
import BaseComponentRenderer from './baseComponentRenderer'
import { PropsContext, ContainerDataContext } from '../context'
import { transformStringToCSSProperties } from '../utils'

interface Props {
    schema: LayoutSchema
}

export default function LayoutComponent(props: Props) {
    const rootRef = useGetDOM(props.schema)
    const context = useContext(PropsContext)
    const containerData = useContext(ContainerDataContext)
    const { style, ...reset } = props.schema.props
    const Component = context.components.get(props.schema.componentName)
    if (!Component) { return <div>未知的布局组件</div> }
    const { dataSource, pathToVal } = props.schema.extraProps
    const { data, loading } = useDataSource(dataSource, pathToVal, containerData.data)

    return (
        <ContainerDataContext.Provider 
            value={{
                data,
                dataLoading: loading
            }}
        >
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
        </ContainerDataContext.Provider>
    )
}