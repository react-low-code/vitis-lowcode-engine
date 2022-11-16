import React from 'react'
import { observableProject as project} from '../../../shell'

import './index.less'

export default class CanvasView extends React.Component<{}, {}> {

    mountContentFrame = (frame: HTMLIFrameElement | null) => {
        project.designer.host.mountContentFrame(frame)
    }

    render(): React.ReactNode {
        const frameStyle = {}
        return (
            <div className='vitis-canvas-view'>
                <iframe
                    name="SimulatorRenderer"
                    className="vitis-simulator-frame"
                    style={frameStyle}
                    ref={this.mountContentFrame}
                />
            </div>
        )
    }
}