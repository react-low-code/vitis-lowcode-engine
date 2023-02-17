import { ResultFile } from '../../../../types/file'

export default function getFile(): [string[], ResultFile] {
    return [['src','hooks'], {
        name: 'useDisabled',
        ext: 'ts',
        content: `import {useEffect, useState} from 'react'
import { DataGroup, DisabledLinkageRule } from '../types'

export default function useDisabled(dataGroup: DataGroup, isDisabled?: DisabledLinkageRule) {
    function computedDisabled() {
        if (!isDisabled) {
            return false
        }

        try {
            return isDisabled(dataGroup.pageData, dataGroup.containerData, dataGroup.formData)
        } catch (error) {
            return false
        }
    }
    const [disabled, setDisabled] = useState<boolean>(computedDisabled)

    useEffect(() => {
        setDisabled(computedDisabled())
    }, [isDisabled?.value, dataGroup.pageData, dataGroup.formData, dataGroup.containerData])

    return disabled
}
          `
    }]
}
