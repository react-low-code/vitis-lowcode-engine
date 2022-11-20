import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'

import { observableProject } from '../../..//shell'

import './detectBorder.less'

export default observer(function DetectBorder() {
    const [style, setStyle] = useState<React.CSSProperties>({})
    useEffect(() => {
        const rect = observableProject.designer.detection.rect
        const hasSelectedNodeId = !!observableProject.documentModel.selectedNodeId
        if (rect) {
            setStyle({
                borderStyle: hasSelectedNodeId ? 'solid' :'dashed',
                left: rect.left,
                width: rect.width,
                height: rect.height,
                top: rect.top
            })
        } else {
            setStyle({})
        }
    }, [observableProject.designer.detection.rect, observableProject.documentModel.selectedNodeId])
    return <div className='vitis-detect-border' style={style}/>
})