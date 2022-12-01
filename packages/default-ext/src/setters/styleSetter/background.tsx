import React, { useState, useEffect } from "react";
import './background.less'

interface Props {
    background?: string | number;
    onChange: (value?: string | number) => void
}

export default function Background(props: Props) {
    const [value, setValue] = useState<string | number | undefined>(props.background)
    useEffect(() => {
        setValue(props.background)
    }, [props.background])
    const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    const onBlur = () => {
        props.onChange(value)
    }

    return (
        <div 
            className="vitis-style-setter-bg" 
            style={{background: props.background}} 
        >
            <input value={value} onInput={onInput} onBlur={onBlur} />
        </div>
    )
}