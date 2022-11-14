
import { PageSchema, NodeSchema } from 'vitis-lowcode-types'
import { ComponentType, ReactInstance } from 'react'
import PageRenderer from './page';

import BaseRenderer from "./baseRenderer";

interface Props {
    schema: PageSchema;
    components: Map<string, ComponentType>;
    onCompGetRef?: (schema: NodeSchema, ref: ReactInstance | null) => void;
    customCreateElement?: (schema: NodeSchema) => React.ReactNode
}

export default class Renderer extends BaseRenderer<Props, {}> {
    render() {
        const { schema } = this.props

        if (schema.isContainer && schema.containerType === 'Page') {
            return <PageRenderer/>
        } else {
            return <div>根节点不是一个页面容器</div>
        }
        
    }
}