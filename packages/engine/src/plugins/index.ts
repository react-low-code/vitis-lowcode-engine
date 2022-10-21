import { LowCodePlugin } from 'vitis-lowcode-types'

export default class PluginManager {
   private pluginMap: Map<string, LowCodePlugin>  = new Map()

   getPluginMap() {
      return new Map(this.pluginMap) 
   }

   delete(pluginName: string) {
      this.pluginMap.delete(pluginName)
   }
}