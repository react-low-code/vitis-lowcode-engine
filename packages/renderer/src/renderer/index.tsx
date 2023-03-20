
import { PageSchema } from 'vitis-lowcode-types'
import PageRenderer from './page';
import React from 'react';

import { PropsContextSpec, PropsContext } from '../context'

export interface Props extends PropsContextSpec {
    schema: PageSchema;
}

export default class Renderer extends React.Component<Props, {}> {
    render() {
        const { schema } = this.props

        if (schema.isContainer && schema.containerType === 'Page') {
            return (
                <PropsContext.Provider value={{...this.props, interceptors: this.props.schema.interceptors}}>
                    <PageRenderer schema={schema}/>
                </PropsContext.Provider>
            )
        } else {
            return <div>根节点不是一个页面容器</div>
        }
    }
}