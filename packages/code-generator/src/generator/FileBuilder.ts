import { IProjectFixedSlot, BuilderComponentPlugin, CodeStruct, ResultDir, CodeStructInput, IProjectTemplate } from '../types'
import { insertFile } from '../utils/templateHelper'
import { generateComponentPath } from '../utils/pluginHelper'
import { NodeSchema } from 'vitis-lowcode-types';

export default class FileBuilder {
    private plugins: BuilderComponentPlugin[];
    private path: string[];
    private fileName: string;
    private ext: string;
    private dynamicSlots: IProjectTemplate['dynamicSlots'];

    constructor(projectSlot: IProjectFixedSlot, dynamicSlots: IProjectTemplate['dynamicSlots']) {
        this.path = projectSlot.path
        this.fileName = projectSlot.fileName
        this.plugins = projectSlot.plugins
        this.dynamicSlots = dynamicSlots
        this.ext = projectSlot.ext
    }

    generateFile(input: CodeStructInput, projectRoot: ResultDir) {
        const initCodeStruct: CodeStruct = {
            input,
            chunks: []
        };

        const finalCodeStruct: CodeStruct = this.plugins.reduce((prevCodeStruct, plugin) => {
            return plugin(prevCodeStruct)
        }, initCodeStruct)

        insertFile(projectRoot, this.path, {
            ext: this.ext,
            name: this.fileName,
            content: this.linkChunks(finalCodeStruct)
        })
    }

    private linkChunks(finalCodeStruct: CodeStruct): string {
        const { chunks } = finalCodeStruct
        let currentChunk = chunks.find(chunk => chunk.linkAfter === undefined)
        let codeContent = ''
        while(currentChunk) {
            codeContent += currentChunk.content

            currentChunk = chunks.find(chunk => chunk.linkAfter === currentChunk!.chunkName)
        }
        return codeContent
    }

    generateModule(input: CodeStructInput, projectRoot: ResultDir) {
        this.generateFile(input, projectRoot)
        const { projectName, componentsMap, title, description } = input
        const getPlugins = (schema: NodeSchema) => {
            if (schema.containerType === 'Data') {
                return this.dynamicSlots.dataContainer.plugins
            } else if (schema.containerType === 'Layout') {
                return this.dynamicSlots.layoutContainer.plugins
            } else if (schema.isFormControl) {
                return this.dynamicSlots.formControl.plugins
            } else {
                return this.dynamicSlots.UIControl.plugins
            }
        }

        const traverse = (schemas: NodeSchema[]) => {
            schemas.forEach(child => {
                const ref = generateComponentPath(child)

                if (ref) {
                    const builder = new FileBuilder({
                        fileName: ref.name,
                        ext: 'tsx',
                        path: this.path.concat(['components']),
                        plugins: getPlugins(child)
                    }, this.dynamicSlots)

                    builder.generateFile({
                        schema: child,
                        projectName,
                        componentsMap,
                        title,
                        description
                    }, projectRoot)
                }

                if (child.children && child.children.length) {
                    traverse(child.children)
                }
            })
        }

        traverse(input.schema.children)
    }
}