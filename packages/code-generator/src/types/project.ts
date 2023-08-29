import { ResultDir, ChunkType, FileType, ChunkName } from './file'
import { NpmInfo, NodeSchema } from 'vitis-lowcode-types'

export interface IProjectTemplate {
    fixedSlots: Record<FixedSlotsName, IProjectFixedSlot>;
    dynamicSlots: Record<DynamicSlotsName, {plugins: BuilderComponentPlugin[]}>;
    generateStaticFiles: () => ResultDir
}

export type FixedSlotsName = 'pages' | 'htmlEntry' | 'packageJSON' | 'service'
export type DynamicSlotsName = 'layoutContainer' | 'dataContainer' | 'UIControl' | 'formControl'  
export interface IProjectFixedSlot {
    path: string[]; 
    fileName: string;
    ext: string;
    plugins: BuilderComponentPlugin[]
}

export interface IProjectPlugins {
    [slotName: string]: BuilderComponentPlugin[];
}

export interface CodeStruct {
    input: CodeStructInput;
    chunks: {
        chunkType: ChunkType;
        fileType: FileType;
        chunkName: ChunkName;
        content: string;
        linkAfter?: ChunkName;
    }[];
}

export interface CodeStructInput {
    componentsMap: Record<string,NpmInfo>;
    projectName: string;
    title: string;
    description: string;
    schema: NodeSchema;
}

export type BuilderComponentPlugin = (initStruct: CodeStruct) => CodeStruct;