import { LowCodePlugin, PluginConfigCreator } from 'vitis-lowcode-types'
import { setters, skeleton, material, plugins } from '../shell'

export default class PluginManager {
   private pluginMap: Map<string, LowCodePlugin>  = new Map()

   getPluginMap() {
      return new Map(this.pluginMap) 
   }

   delete(pluginName: string) {
      this.pluginMap.delete(pluginName)
   }

   async register(pluginConfigCreator: PluginConfigCreator , options?: any): Promise<void> {
      if (this.pluginMap.get(pluginConfigCreator.pluginName)) {
         return Promise.reject(`${pluginConfigCreator.pluginName}已经存在`)
      }
      const config = pluginConfigCreator({
         setters,
         skeleton,
         material,
         plugins,
      }, options)

      await config.init()
      this.pluginMap.set(pluginConfigCreator.pluginName, {
         options,
         config,
         pluginName: pluginConfigCreator.pluginName
      })

      return Promise.resolve()
   }
}