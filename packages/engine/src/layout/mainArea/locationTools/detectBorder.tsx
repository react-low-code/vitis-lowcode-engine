import React, { useEffect, useState } from 'react'

import './detectBorder.less'

interface Props {
    type: 'solid' | 'dashed'
    position?: DOMRect
    show: boolean
}

export default function DetectBorder(props: Props) {
    const [style, setStyle] = useState<React.CSSProperties>({})
    useEffect(() => {
        if (props.position && props.show) {
            setStyle({
                borderStyle: props.type,
                left: props.position.left,
                width: props.position.width,
                height: props.position.height,
                top: props.position.top
            })
        } else {
            setStyle({})
        }
    }, [props.show, props.position])
    return <div className='vitis-detect-border' style={style}/>
}