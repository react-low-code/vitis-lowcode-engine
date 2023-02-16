import { ResultDir, ChunkType, FileType, ChunkName } from './file'

export interface IProjectTemplate {
    slots: Record<Modules, IProjectSlot>;
    generateTemplate: () => ResultDir | Promise<ResultDir>;
}

export type Modules = 'pages' | 'htmlEntry' | 'packageJSON' | 'service'
  
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
        chunkName: ChunkName;
        content: string;
        linkAfter: ChunkName[];
    }[]
}

export type BuilderComponentPlugin = (initStruct: CodeStruct) => CodeStruct;