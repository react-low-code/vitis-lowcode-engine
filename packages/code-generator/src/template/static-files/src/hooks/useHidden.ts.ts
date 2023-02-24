import { ResultFile } from '../../../../types/file'

export default function getFile(): [string[], ResultFile] {
    return [['src','hooks'], {
        name: 'useHidden',
        ext: 'ts',
        content: `import {useEffect, useState} from 'react'
        import { DataGroup, HiddenLinkageRule } from '../types'
        
        export default function useHidden(dataGroup: DataGroup, isHidden?: HiddenLinkageRule) {
            function computedHidden() {
                if (!isHidden) {
                    return false
                }
                try {
                    return isHidden(dataGroup.pageData, dataGroup.containerData, dataGroup.formData)
                } catch (error) {
                    return false
                }
            }
            const [hidden, setHidden] = useState<boolean>(computedHidden)
        
            useEffect(() => {
                setHidden(computedHidden())
            }, [isHidden, dataGroup.pageData, dataGroup.formData, dataGroup.containerData])
        
            return hidden
        }`
    }]
}
