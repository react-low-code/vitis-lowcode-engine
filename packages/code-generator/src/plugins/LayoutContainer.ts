import { CodeStruct, FileType, ChunkType, ChunkName } from '../types'
import { generateTagProps, generateUseDataSource, generateComponentRef } from '../utils/pluginHelper'

interface ComponentRef {
    path: string;
    name: string;
}

function toLocaleStartUpperCase(name: string) {
    return name[0].toLocaleUpperCase() + name.slice(1)
}

export default function plugin(struct: CodeStruct) {
    const input = struct.input
    const schema = input.schema
    const thisComponent: ComponentRef = {
        path: schema.packageName, 
        name: toLocaleStartUpperCase(schema.componentName)
    }

    const childrenRef = schema.children.map(generateComponentRef).filter(c => !c) as {path: string, name: string, key: string}[]

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TSX,
        chunkName: ChunkName.ImportExternalJSModules,
        content: `import React, { useContext } from 'react'
        ${'import ' + thisComponent.name + ' from ' + "'" +thisComponent.path + "'"}
        `,
        linkAfter: []
    })

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TSX,
        chunkName: ChunkName.ImportInternalJSModules,
        content: `
        import { GlobalDataContext, ContainerDataContext } from '../../../context'
        import useDataSource from '../../../hooks/useDataSource'
        import useHidden from '../../../hooks/useHidden'

        ${childrenRef.map(ref => 'import ' + ref.name + ' from ' + ref.path).join('\n')}
        `,
        linkAfter: [ChunkName.ImportExternalJSModules]
    })

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TSX,
        chunkName: ChunkName.ComponentDefaultExportStart,
        content: ` interface Props {}

        export default function Container(props: Props) {`,
        linkAfter: [
            ChunkName.ImportInternalJSModules
        ]
    })

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TSX,
        chunkName: ChunkName.ComponentInternalFunc,
        content: `
            const isHiddenFunc = ${schema.extraProps.isHidden?.value}`,
        linkAfter: [ChunkName.ComponentDefaultExportStart]
    })

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TSX,
        chunkName: ChunkName.ReactHooksUse,
        content: `
        const {data: containerData} = useContext(ContainerDataContext)
        const { formData, pageData } = useContext(GlobalDataContext)
        ${generateUseDataSource(schema.extraProps.dataSource, schema.extraProps.pathToVal, 'containerData')}
        const isHidden = useHidden({pageData, formData, containerData}, isHiddenFunc)
        `,
        linkAfter: [ChunkName.ComponentInternalFunc]
    })

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TSX,
        chunkName: ChunkName.ComponentRenderContentStart,
        content: `
        return (`,
        linkAfter: [ChunkName.ReactHooksUse]
    })

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TSX,
        chunkName: ChunkName.ContainerDataContextProviderStart,
        content: `<ContainerDataContext.Provider value={{
            data,
            dataLoading: loading
        }}>`,
        linkAfter: [ChunkName.ComponentRenderContentStart]
    })

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TSX,
        chunkName: ChunkName.ComponentRenderContentMain,
        content: `{isHidden?
            <div style={{flex: 1}}/>:
            <${thisComponent.name} ${generateTagProps(schema.props, schema.id!)}>
                ${childrenRef.map(child => {
                    return `<${child.name} key=${child.key}/>`
                }).join('\n')}
            </${thisComponent.name}>
        }
        `,
        linkAfter: [ChunkName.ContainerDataContextProviderStart]
    })

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TSX,
        chunkName: ChunkName.ContainerDataContextProviderEnd,
        content: `</ContainerDataContext.Provider>`,
        linkAfter: [ChunkName.ComponentRenderContentMain]
    })

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TSX,
        chunkName: ChunkName.ComponentRenderContentEnd,
        content: `)`,
        linkAfter: [ChunkName.ContainerDataContextProviderEnd]
    })

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TSX,
        chunkName: ChunkName.ComponentDefaultExportEnd,
        content: `
        }`,
        linkAfter: [
            ChunkName.ComponentRenderContentEnd, 
        ]
    })
    
    return struct
}