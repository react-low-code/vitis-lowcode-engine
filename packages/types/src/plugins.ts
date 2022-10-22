import { SettersSpec } from './setter'
import { ProjectSpec } from './project'
import { SkeletonSpec } from './skeleton'
import { MaterialSpec } from './material'

export interface  PluginConfig{
    init(): Promise<void>;
    destroy?(): void;
}

export interface PluginConfigCreator {
    (ctx: PluginContext, options: any): PluginConfig;
    pluginName: string;
}

export interface PluginManagerSpec {
    register(pluginConfigCreator: PluginConfigCreator , options?: any): Promise<void>;
    delete(pluginName: string): Promise<boolean> 
    has(pluginName: string): boolean
    get(pluginName: string): LowCodePlugin | undefined
    getAll(): Map<string, LowCodePlugin>
}

export interface PluginContext{
    skeleton: SkeletonSpec;
    plugins: PluginManagerSpec;
    setters: SettersSpec;
    material: MaterialSpec;
    project: ProjectSpec;
}

export interface LowCodePlugin {
    pluginName:  string;
    config: PluginConfig;
    options: any
}