import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { observableProject } from '../../..//shell'

import './insertionView.less'

export default observer(function InsertionView() {
    const [style, setStyle] = useState<React.CSSProperties>({})
    useEffect(() => {
        const locationData = observableProject.designer.dragon.locationData
        if (!locationData) {
            setStyle({})
        } else {
            const { width, left, top } = locationData.containerRect
            setStyle({
                borderTopStyle: 'solid',
                width,
                left,
                top
            })
        }
    }, [observableProject.designer.dragon.locationData])
    return (
        <div className='vitis-insertion-view' style={style}></div>
    )
})
