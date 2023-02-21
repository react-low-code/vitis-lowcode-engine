import { CodeStruct, FileType, ChunkType, ChunkName } from '../types'
import { generateTagProps, generateUseDataSource } from '../utils/pluginHelper'

interface ComponentRef {
    path: string;
    name: string;
}

function toLocaleStartUpperCase(name: string) {
    return name[0].toLocaleUpperCase() + name.slice(1,-1)
}

export default function plugin(struct: CodeStruct) {
    const input = struct.input
    const schema = input.schema
    const thisComponent: ComponentRef = {
        path: schema.packageName, 
        name: toLocaleStartUpperCase(schema.componentName)
    }

    const childrenRef = schema.children.map(child => {
        const id = child.id!
        if (child.isContainer) {
            if (child.containerType === 'Layout') {
                return {
                    path: `./components/LayoutContainer${id}.tsx`,
                    name: `LayoutContainer${id}`,
                    key: id
                }
            } else if (child.containerType === 'Data') {
                return {
                    path: `./components/DataContainer${id}.tsx`,
                    name: `DataContainer${id}`,
                    key: id
                }
            } else {
                return undefined
            }
        } else {
            if (child.isFormControl) {
                return {
                    path: `./components/FormControl${id}.tsx`,
                    name: `FormControl${id}`,
                    key: id
                }
            } else {
                return {
                    path: `./components/UIControl${id}.tsx`,
                    name: `UIControl${id}`,
                    key: id
                }
            }
            
        }
    }).filter(c => !c) as {path: string, name: string, key: string}[]

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TSX,
        chunkName: ChunkName.ImportExternalJSModules,
        content: `import React, { useContext, useState } from 'react'
        ${'import ' + thisComponent.name + ' from ' + thisComponent.path}
        `,
        linkAfter: []
    })

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TSX,
        chunkName: ChunkName.ImportInternalJSModules,
        content: `
        import { GlobalDataContext, ContainerDataContext } from '../../context'
        import useDataSource from '../../hooks/useDataSource'
        import useHidden from '../../hooks/useHidden'

        ${childrenRef.map(ref => 'import ' + ref.name + ' from ' + ref.path).join('\n')}
        `,
        linkAfter: [ChunkName.ImportExternalJSModules]
    })

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TSX,
        chunkName: ChunkName.ComponentDefaultExportStart,
        content: ` interface Props {}

        export default function Layout(props: Props) {`,
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