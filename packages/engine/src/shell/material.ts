import { MaterialSpec, NpmInfo} from 'vitis-lowcode-types'
import type InnerMaterial from '../material'
import { EventEmitter } from 'eventemitter3';
import { ASSET_UPDATE } from '../eventType'

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
      console.log('ffff', upload)
        if (upload.length) {
            this.emit(ASSET_UPDATE, upload)
        }
      return loadedResult
    }

    has = (packageName: string) => {
      return this.material.innerGetComponentSpecRawMap().has(packageName)
    }

    get = (packageName: string) => {
      return this.getAll().get(packageName)
    }

    getAll = () => {
      return this.material.getComponentSpecRawMap()
    }
}