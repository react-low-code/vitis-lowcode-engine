import { MaterialSpec, NpmInfo} from 'vitis-lowcode-types'
import type InnerMaterial from '../material'

export default class Material implements MaterialSpec {
    private readonly material: InnerMaterial;

    constructor(material: InnerMaterial) {
        this.material = material
    }
    /**
     * 加载组件规格
     * @param infos 
     */
    load(infos: NpmInfo[]): Promise<boolean[]> {
      return this.material.load(infos)
    }

    has(packageName: string) {
      return this.material.getComponentSpecMetaMap().has(packageName)
    }
}