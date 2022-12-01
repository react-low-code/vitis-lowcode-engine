import React from "react";
import './background.less'

interface Props {
    background?: string | number;
    onChange: (value?: string | number) => void
}

export default function Background(props: Props) {
    return (
        <div 
            className="vitis-style-setter-bg" 
            style={{background: props.background}} 
            contentEditable
            
        >
            {props.background}
        </div>
    )
}