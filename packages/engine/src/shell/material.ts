import { MaterialSpec, NpmInfo, ComponentSpecRaw} from 'vitis-lowcode-types'
import type InnerMaterial from '../material'
import { EventEmitter } from 'eventemitter3';
import { ASSET_UPDATED } from '../eventType'

export default class Material extends EventEmitter implements MaterialSpec  {
    private readonly material: InnerMaterial;

    constructor(material: InnerMaterial) {
      super()
        this.material = material
    }
    /**
     * 加载组件规格
     * @param infos 
     */
    load = async (infos: NpmInfo[]): Promise<boolean[]> => {
      const loadedResult = await this.material.loadComponentSpec(infos)
      const upload = infos.filter((_, index) => loadedResult[index]).map(info => info.npm)
        if (upload.length) {
            this.emit(ASSET_UPDATED, upload)
        }
      return loadedResult
    }

    has = (packageName: string) => {
      return this.material.getComponentSpecRawMap().has(packageName)
    }

    get = (packageName: string) => {
      return this.getAll().get(packageName)
    }

    getAll = () => {
      const componentSpecRawMap = this.material.getComponentSpecRawMap()
      const result = new Map<string, ComponentSpecRaw>()

      for (const [key, spec] of componentSpecRawMap) {
        const component = spec.advanced?.component
        if (component?.containerType !== 'Page') {
          result.set(key, spec)
        }
      }
      
      return result
    }

    addComponentSpec = (packageName: string, spec: ComponentSpecRaw) => {
      this.material.addComponentSpec(packageName, spec)
    }
}