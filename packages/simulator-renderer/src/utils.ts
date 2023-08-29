import { HostSpec } from 'vitis-lowcode-types'

export function getHost() {
    // 设计器将它提供的方法放在渲染器环境 iframe 的 LCSimulatorHost 上
    return window.LCSimulatorHost as HostSpec
}

class DeferUtil {
    private renderResolveHandler: Function | undefined

    waitMounted() {
        return new Promise(resolve => {
            this.renderResolveHandler = resolve
        })
    }

    resolvedRender() {
        if (this.renderResolveHandler) {
            this.renderResolveHandler()
        }
    }
}

export const deferUtil = new DeferUtil()