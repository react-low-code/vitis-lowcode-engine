import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { observableProject } from '../../..//shell'

import './insertionView.less'

export default observer(function InsertionView() {
    const [style, setStyle] = useState<React.CSSProperties>({})
    useEffect(() => {
        const dropLocation = observableProject.designer.dragon.dropLocation
        if (!dropLocation) {
            setStyle({})
        } else {
            const { width, left, top } = dropLocation.containerRect
            setStyle({
                borderTopStyle: 'solid',
                width,
                left,
                top
            })
        }
    }, [observableProject.designer.dragon.dropLocation])
    return (
        <div className='vitis-insertion-view' style={style}></div>
    )
})
