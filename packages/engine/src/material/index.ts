import { NpmInfo, ComponentSpecRaw } from 'vitis-lowcode-types'
import { getComponentSpecUrl } from '../utils'

export default class Material {
    private componentSpecRawMap: Map<string, ComponentSpecRaw> = new Map()

    async loadComponentSpec(infos: NpmInfo[]): Promise<boolean[]> {
        const promiseSettledResult = await Promise.allSettled(infos.map(async info => {
            if (this.componentSpecRawMap.has(info.npm)) {
                console.warn(`已经加载过${info.npm}，现在开始重新加载并替换原来的`)
            }
            
            const response =  await fetch(getComponentSpecUrl(info))
            return {
                info,
                text: await response.text()
            }
        }))

        const result: boolean[] = []

        for (const item of promiseSettledResult) {
            if (item.status === 'rejected') {
                result.push(false)
            } else {
                try {
                    const spec = JSON.parse(item.value.text)
                    this.componentSpecRawMap.set(item.value.info.npm, spec)
                    result.push(true)
                } catch (error) {
                    result.push(false)
                }
            }
        }

        return result
    }

    innerGetComponentSpecRawMap() {
        return this.componentSpecRawMap
    }

    getComponentSpecRawMap() {
        return new Map(this.componentSpecRawMap)
    }

    getComponentSpecRaw(name: string) {
        return this.innerGetComponentSpecRawMap().get(name)
    }
}