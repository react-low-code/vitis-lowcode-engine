import { observer } from 'mobx-react'
import { Renderer, IRendererProps } from 'vitis-lowcode-renderer'
import observerData from './store'


export default observer((props: Omit<IRendererProps ,'components' | 'schema'>) => {
    return <Renderer {...props} {...observerData}/>
})