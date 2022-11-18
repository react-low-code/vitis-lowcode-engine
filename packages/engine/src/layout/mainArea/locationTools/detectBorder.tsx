import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'

import { observableProject } from '../../..//shell'

import './detectBorder.less'
import { reaction } from 'mobx'

export default observer(function DetectBorder() {
    const [style, setStyle] = useState<React.CSSProperties>({})
    useEffect(() => {
        const rect = observableProject.designer.detection.rect
        if (rect) {
            setStyle({
                borderStyle: 'dashed',
                left: rect.left,
                width: rect.width,
                height: rect.height,
                top: rect.top
            })
        } else {
            setStyle({})
        }
    }, [observableProject.designer.detection.rect])
    return <div className='vitis-detect-border' style={style}/>
})