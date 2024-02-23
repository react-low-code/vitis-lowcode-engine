import React, { useContext, useState } from 'react'
import { PageSchema } from 'vitis-lowcode-types'
import { PropsContext, GlobalDataContext, ContainerDataContext } from '../context'
import BaseComponentRenderer from './baseComponentRenderer'
import useGetDOM from '../hooks/useGetDOM'
import useDataSource from '../hooks/useDataSource'
import { Path } from 'depath'
import {generateAttrs} from '../generateAttr'
import './page.less'

interface Props {
    schema: PageSchema
}

export default function PageRenderer(props: Props) {
    const propsContext = useContext(PropsContext)
    const rootRef = useGetDOM(props.schema)
    const [formData, setFormData] = useState({})
    const [formErrors, setFormErrors] = useState({})
    const { loading, data } = useDataSource(props.schema.extraProps.dataSource)
    const attrs = generateAttrs(props.schema.props)

    const updateFormData = (path: string, value: any) => {
        setFormData(Path.setIn(Object.assign({}, formData), path, value))
    }

    const updateFormErrors = (path: string, value: any) => {
        setFormErrors(Path.setIn(Object.assign({}, formErrors), path, value))
    }

    return (
        <GlobalDataContext.Provider value={{
            pageData: data,
            pageLoading: loading,
            formData,
            formErrors,
            updateFormData,
            updateFormErrors
        }}>
            <ContainerDataContext.Provider value={{
                data,
                dataLoading: loading
            }}>
                <div 
                    {...attrs}
                    data-node-id={props.schema.id} 
                    className="vitis-page-container"
                    ref={rootRef}
                >{
                    !props.schema.children.length ? 
                    propsContext.customEmptyElement ? propsContext.customEmptyElement(props.schema): null: 
                    <>{props.schema.children.map(child => <BaseComponentRenderer schema={child} key={child.id}/>)}</>
                }</div>
            </ContainerDataContext.Provider>
        </GlobalDataContext.Provider>
    )
}