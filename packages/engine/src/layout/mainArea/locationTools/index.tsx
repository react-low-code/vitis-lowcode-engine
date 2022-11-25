import React from 'react'
import InsertionView from './insertionView'
import DetectBorder from './detectBorder'
import Operation from './operation'
import { observer } from 'mobx-react'
import { observableProject } from '../../..//shell'

export default observer(function LocationTools() {
    const detection = observableProject.designer.detection
    const selectedNodeId = observableProject.documentModel.selectedNodeId
    const hoveredNodeId = observableProject.documentModel.hoveredNodeId
    return (
        <>
            <InsertionView />
            <DetectBorder 
                type="dashed" 
                position={detection.hoveredNodePosition} 
                show={!!hoveredNodeId && hoveredNodeId !== selectedNodeId}
            />
            <DetectBorder 
                type="solid" 
                position={detection.selectedNodePosition} 
                show={!!selectedNodeId}
            />
            <Operation />
        </>
    )
})
