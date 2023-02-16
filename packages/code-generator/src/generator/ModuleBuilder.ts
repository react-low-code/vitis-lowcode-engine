import { IProjectSlot, BuilderComponentPlugin, ResultFile, CodeStruct, ResultDir } from '../types'
import { createResultDir, insertDirectory } from '../utils/templateHelper'

export default class ModuleBuilder {
    plugins: BuilderComponentPlugin[];
    path: string[];
    fileName?: string
    ext?: string

    constructor(projectSlot: IProjectSlot) {
        this.path = projectSlot.path
        this.fileName = projectSlot.fileName
        this.plugins = projectSlot.plugins
    }

    generateModule(input: any): ResultFile {
        const initCodeStruct: CodeStruct = {
            input,
            chunks: []
        };

        const finalCodeStruct: CodeStruct = this.plugins.reduce((prevCodeStruct, plugin) => {
            return plugin(prevCodeStruct)
        }, initCodeStruct)
    
        return {
            ext: this.ext || 'jsx',
            name: this.fileName || 'index',
            content: ''
        }
    }

    generatePage(input: any, projectRoot: ResultDir, pageName: string = 'Home') {
        const parentDir = insertDirectory(projectRoot, this.path)
        const pageDir = createResultDir(pageName)
        
    }
}