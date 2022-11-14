
import { PageSchema } from 'vitis-lowcode-types'
import PageRenderer from './page';

import BaseRenderer from "./baseRenderer";
import { ContextSpec, Context } from '../context'
import { emptyPageComponent } from '../default/component'

interface Props extends ContextSpec{
    schema: PageSchema;
}

export default class Renderer extends BaseRenderer<Props, {}> {

    get defaultConfig() {
        return {
            emptyPageComponent
        }
    }

    render() {
        const { schema } = this.props

        if (schema.isContainer && schema.containerType === 'Page') {
            return (
                <Context.Provider value={{...this.defaultConfig,...this.props}}>
                    <PageRenderer nodeSchema={schema}/>
                </Context.Provider>
            )
        } else {
            return <div>根节点不是一个页面容器</div>
        }
    }
}