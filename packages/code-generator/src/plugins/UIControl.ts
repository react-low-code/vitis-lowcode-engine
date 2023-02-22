import { CodeStruct, FileType, ChunkType, ChunkName } from '../types'
import { generateTagProps } from '../utils/pluginHelper'

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

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TSX,
        chunkName: ChunkName.ImportExternalJSModules,
        content: `import React, { useContext, useState } from 'react'
        ${'import ' + thisComponent.name + ' from ' + "'" +thisComponent.path + "'"}
        `,
        linkAfter: []
    })

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TSX,
        chunkName: ChunkName.ImportInternalJSModules,
        content: `
        import { GlobalDataContext, ContainerDataContext } from '../../context'
        import useHidden from '../../hooks/useHidden'
        import useGetInitVal from '../../hooks/useGetInitVal'
        `,
        linkAfter: [ChunkName.ImportExternalJSModules]
    })

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TSX,
        chunkName: ChunkName.ComponentDefaultExportStart,
        content: ` interface Props {}

        export default function UIControl(props: Props) {`,
        linkAfter: [
            ChunkName.ImportInternalJSModules
        ]
    })

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TSX,
        chunkName: ChunkName.ComponentInternalFunc,
        content: `
            const isHiddenFunc = ${schema.extraProps.isHidden?.value}

        `,
        linkAfter: [ChunkName.ComponentDefaultExportStart]
    })

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TSX,
        chunkName: ChunkName.ReactHooksUse,
        content: `
        const {data: containerData} = useContext(ContainerDataContext)
        const { formData, pageData } = useContext(GlobalDataContext)

        const isHidden = useHidden({pageData, formData, containerData}, isHiddenFunc)
        const value = useGetInitVal(${schema.extraProps.pathToVal}, ${schema.props.defaultValue})
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
        chunkName: ChunkName.ComponentRenderContentMain,
        content: `{!isHidden && 
            <${thisComponent.name} ${generateTagProps(schema.props, schema.id!)} value={value} />
        }
        `,
        linkAfter: [ChunkName.ComponentRenderContentStart]
    })

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TSX,
        chunkName: ChunkName.ComponentRenderContentEnd,
        content: `)`,
        linkAfter: [ChunkName.ComponentRenderContentMain]
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