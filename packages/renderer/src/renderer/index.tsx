
import { PageSchema } from 'vitis-lowcode-types'
import PageRenderer from './page';
import React from 'react';
import useLifeCycles from '../hooks/useLifeCycles'

import { PropsContextSpec, PropsContext } from '../context'

export interface Props extends Omit<PropsContextSpec,'interceptors'>{
    schema: PageSchema;
}


export default function Renderer(props:Props){
    const { schema } = props
    useLifeCycles(schema.lifeCycles)

    if (schema.isContainer && schema.containerType === 'Page') {
        return (
            <PropsContext.Provider value={{...props, interceptors: schema.interceptors}}>
                <PageRenderer schema={schema}/>
            </PropsContext.Provider>
        )
    } else {
        return <div>根节点不是一个页面容器</div>
    }
}