import renderer from './renderer'

import './index.less'

if (window) {
    window.SimulatorRenderer = renderer
}

export default renderer