import React, { useState, useRef, useLayoutEffect } from "react";
import { observer } from 'mobx-react'
import { observableProject } from '../../../shell'
import { UnorderedListOutlined, DeleteOutlined, CopyOutlined } from '@ant-design/icons'
import { Popover } from 'antd';
import type Node from "../../../node";

import './operation.less'

const ComponentTreeOutLook = (props: {node?: Node | null; level: number}) => {
    if (props.node) {
        return (
            <>
                <div style={{marginRight: props.level * 8 + 'px', }} className="vitis-node-component-tree-item">{props.node.title}</div>
                {<ComponentTreeOutLook node={props.node.parent} level={props.level + 1}/>}
            </>
        )
    } 

    return null
}

export default observer(function Operation() {
    const [style, setStyle] = useState<React.CSSProperties>({})
    const rootRef = useRef<HTMLDivElement>(null)
    useLayoutEffect(() => {
        const rect = observableProject.designer.detection.selectedNodePosition
        if (rect && observableProject.documentModel.currentNode) {
            setStyle({
                left: rect.right - (rootRef.current?.clientWidth || 0),
                top: rect.top,
                visibility: 'visible'
            })
        } else {
            setStyle({})
        }
    
    }, [observableProject.designer.detection.selectedNodePosition, observableProject.documentModel.currentNode])

    const onDel = () => {
        observableProject.documentModel.delNode(observableProject.documentModel.selectedNodeId!)
        observableProject.designer.selectNode(undefined)
    }

    const onCopy = () => {
        const currentNode = observableProject.documentModel.currentNode!
        const node = observableProject.documentModel.copyNode(currentNode);
        currentNode.parent?.insertAfter(node, currentNode)
        observableProject.designer.rerender()
    }

    return (
        <div className="vitis-node-operation" style={style} ref={rootRef}>
            {observableProject.documentModel.currentNode && 
            <Popover 
                placement="bottomRight"
                trigger="hover"
                showArrow={false}
                content={<ComponentTreeOutLook node={observableProject.documentModel.currentNode} level={0}/>}
                overlayClassName="vitis-node-operation-component-tree-popover"
            >
                <UnorderedListOutlined className="icon"/>
            </Popover>
            }
            {observableProject.documentModel.currentNode?.componentSpec.unableDel === false && <DeleteOutlined className="icon" onClick={onDel}/>}
            {observableProject.documentModel.currentNode?.componentSpec.unableCopy === false && <CopyOutlined className="icon" onClick={onCopy}/>}
        </div>
    )
})