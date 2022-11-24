import { observable } from 'mobx'
import { IRendererProps } from 'vitis-lowcode-renderer'
import { getHost } from './utils'

const host = getHost()

export default observable<Pick<IRendererProps ,'components' | 'schema'>>({
    components: host.project.designer.componentImplMap,
    schema: host.project.schema
})