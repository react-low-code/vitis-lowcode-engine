import { ResultDir, ChunkType, FileType } from './file'

export interface IProjectTemplate {
    slots: Record<Modules, IProjectSlot>;
    generateTemplate: () => ResultDir | Promise<ResultDir>;
}

export type Modules = 'pages' | 'htmlEntry' | 'packageJSON'
  
export interface IProjectSlot {
    path: string[]; 
    fileName?: string;
    ext?: string;
    plugins: BuilderComponentPlugin[]
}

export interface IProjectPlugins {
    [slotName: string]: BuilderComponentPlugin[];
}

export interface CodeStruct {
    input: any,
    chunks: {
        chunkType: ChunkType;
        fileType: FileType;
        content: string;
        linkAfter: string[];
    }[]
}

export type BuilderComponentPlugin = (initStruct: CodeStruct) => CodeStruct;