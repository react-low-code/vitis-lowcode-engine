import { CodeStruct, FileType, ChunkType, ChunkName } from '../types'
import { generateTagProps, generateUseDataSource, generateComponentRef } from '../utils/pluginHelper'

export default function plugin(struct: CodeStruct) {
    const input = struct.input
    const schema = input.schema

    // 只有布局容器才能作为 page 的 children
    const childrenRef = schema.children.map(generateComponentRef).filter(c => !!c) as  {path: string, name: string, key: string}[]

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TSX,
        chunkName: ChunkName.ImportExternalJSModules,
        content: `import React, { useState } from 'react'
        import { Path } from 'depath'
        `,
    })

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TSX,
        chunkName: ChunkName.ImportInternalJSModules,
        content: `
        import { GlobalDataContext, ContainerDataContext } from '../../context'
        import useDataSource from '../../hooks/useDataSource'
        ${childrenRef.map(ref => 'import ' + ref.name + ' from "' + ref.path + '"').join('\n')}
        `,
        linkAfter: ChunkName.ImportExternalJSModules
    })

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TSX,
        chunkName: ChunkName.ComponentDefaultExportStart,
        content: `
        export default function Index(props: {}) {
            `,
        linkAfter: ChunkName.ImportInternalJSModules, 
    })

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TSX,
        chunkName: ChunkName.ReactHooksUse,
        content: `const [formData, setFormData] = useState({})
        const [formErrors, setFormErrors] = useState({})
        ${generateUseDataSource(schema.extraProps?.dataSource)}
        `,
        linkAfter: ChunkName.ComponentDefaultExportStart
    })

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TSX,
        chunkName: ChunkName.ComponentInternalFunc,
        content: `const updateFormData = (path: string, value: any) => {
            setFormData(Path.setIn(Object.assign({}, formData), path, value))
        }
    
        const updateFormErrors = (path: string, value: any) => {
            setFormErrors(Path.setIn(Object.assign({}, formErrors), path, value))
        }`,
        linkAfter: ChunkName.ReactHooksUse
    })

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TSX,
        chunkName: ChunkName.ComponentRenderContentStart,
        content: `
        return (
        `,
        linkAfter: ChunkName.ComponentInternalFunc
    })

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TSX,
        chunkName: ChunkName.GlobalDataContextProviderStart,
        content: `<GlobalDataContext.Provider value={{
            pageData: data,
            pageLoading: loading,
            formData,
            formErrors,
            updateFormData,
            updateFormErrors
        }}>
        `,
        linkAfter: ChunkName.ComponentRenderContentStart
    })

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TSX,
        chunkName: ChunkName.ContainerDataContextProviderStart,
        content: `<ContainerDataContext.Provider value={{
            data,
            dataLoading: loading
        }}>
        `,
        linkAfter: ChunkName.GlobalDataContextProviderStart
    })

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TSX,
        chunkName: ChunkName.ComponentRenderContentMain,
        content: `<div ${generateTagProps(schema.props, schema.id!)}>
            ${childrenRef.map(child => '<' + child.name +'/>').join('\n')}
        </div>
        `,
        linkAfter: ChunkName.ContainerDataContextProviderStart
    })

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TSX,
        chunkName: ChunkName.ContainerDataContextProviderEnd,
        content: `</ContainerDataContext.Provider>
        `,
        linkAfter: ChunkName.ComponentRenderContentMain
    })

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TSX,
        chunkName: ChunkName.GlobalDataContextProviderEnd,
        content: `</GlobalDataContext.Provider>
        `,
        linkAfter: ChunkName.ContainerDataContextProviderEnd
    })

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TSX,
        chunkName: ChunkName.ComponentRenderContentEnd,
        content: `)`,
        linkAfter: ChunkName.GlobalDataContextProviderEnd
    })

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TSX,
        chunkName: ChunkName.ComponentDefaultExportEnd,
        content: `
        }`,
        linkAfter: ChunkName.ComponentRenderContentEnd,
    })
    
    return struct
}