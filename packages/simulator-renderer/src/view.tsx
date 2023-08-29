import { observer } from 'mobx-react'
import { Renderer, IRendererProps } from 'vitis-lowcode-renderer'
import { useEffect } from 'react'
import observerData from './store'
import { deferUtil } from './utils'


export default observer((props: Omit<IRendererProps ,'components' | 'schema'>) => {
    useEffect(() => {
        deferUtil.resolvedRender()
    }, [observerData.schema])
    return <Renderer {...props} {...observerData}/>
})