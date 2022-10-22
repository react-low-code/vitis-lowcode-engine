import { PluginConfigCreator, LowCodePlugin, PluginManagerSpec } from 'vitis-lowcode-types'
import type InnerPlugins from '../plugins'


export default class PluginManager implements PluginManagerSpec {
    private readonly plugins: InnerPlugins
    constructor(plugins: InnerPlugins) {
        this.plugins = plugins
    }

    /**
     * 注册插件
     * @param pluginConfigCreator 
     * @param options 
     */
    register(pluginConfigCreator: PluginConfigCreator , options?: any) {
        return this.plugins.register(pluginConfigCreator, options)
    }

    /**
     * 删除插件
     * @param pluginName 
     */
    delete(pluginName: string): Promise<boolean> {
        if (this.has(pluginName)) {
            const thisPlugin = this.get(pluginName)!
            this.plugins.delete(pluginName);
            if (thisPlugin.config.destroy) {
                thisPlugin.config.destroy()
            }
        }

        return Promise.resolve(true)
    }

    /**
     * 是否已经注册了插件
     * @param pluginName 
     */
    has(pluginName: string): boolean {
        return this.getAll().has(pluginName)
    }

    /**
     * 获取插件
     * @param pluginName 
     */
    get(pluginName: string): LowCodePlugin | undefined {
        return this.getAll().get(pluginName)
    }

    /**
     * 获取全部插件
     */
    getAll(): Map<string, LowCodePlugin> {
        return this.plugins.getPluginMap()
    }
}