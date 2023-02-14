import { ResultDir } from './file'

export interface IProjectTemplate {
    slots: Record<string, IProjectSlot>;
    generateTemplate: () => ResultDir | Promise<ResultDir>;
}
  
export interface IProjectSlot {
    path: string[]; 
    fileName?: string;
    plugins: BuilderComponentPlugin[]
}

export interface IProjectPlugins {
    [slotName: string]: BuilderComponentPlugin[];
}

export type BuilderComponentPlugin = (initStruct: string) => Promise<string>;