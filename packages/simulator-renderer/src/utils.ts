import { HostSpec } from 'vitis-lowcode-types'

export function getHost() {
    // 渲染引擎将它提供的方法放在模拟器 iframe 的 LCSimulatorHost 上
    return window.LCSimulatorHost as HostSpec
}

class DeferUtil {
    private renderResolveHandler: Function | undefined

    didRender() {
        return new Promise(resolve => {
            this.renderResolveHandler = resolve
        })
    }

    resolveRender() {
        if (this.renderResolveHandler) {
            this.renderResolveHandler()
        }
    }
}

export const deferUtil = new DeferUtil()