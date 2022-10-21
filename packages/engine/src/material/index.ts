import { NpmInfo, ComponentSpecMeta } from 'vitis-lowcode-types'

export default class Material {
    private componentSpecMetaMap: Map<string, ComponentSpecMeta> = new Map()

    load(infos: NpmInfo[]): Promise<boolean[]> {
       return Promise.resolve([])
    }

    getComponentSpecMetaMap() {
        return new Map(this.componentSpecMetaMap)
    }
}