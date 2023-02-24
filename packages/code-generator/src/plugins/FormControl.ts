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
        import { GlobalDataContext, ContainerDataContext } from '../../../context'
        import useHidden from '../../../hooks/useHidden'
        import useSetFormControlVal from '../../../hooks/useSetFormControlVal'
        import useSetFormErrors from '../../../hooks/useSetFormErrors'
        import useDisabled from '../../../hooks/useDisabled'
        `,
        linkAfter: [ChunkName.ImportExternalJSModules]
    })

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TSX,
        chunkName: ChunkName.ComponentDefaultExportStart,
        content: `interface Props {}

        export default function FormControl(props: Props) {`,
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
            const isDisabledFunc = ${schema.extraProps.isDisabled?.value}
            const getValue = ${schema.extraProps.getValue?.value}

            const verifyRules = ${schema.extraProps.verifyRules?.map(rule => {
                return {
                    max: rule.max,
                    min: rule.min,
                    required: rule.required,
                    customized: rule.customized?.value,
                    message: rule.message
                }
            })}

            const onChange = (val: any) => {
                if (name) { 
                    updateFormData(name, val) 
                }
            }
        `,
        linkAfter: [ChunkName.ComponentDefaultExportStart]
    })

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TSX,
        chunkName: ChunkName.ReactHooksUse,
        content: `
        const {data: containerData} = useContext(ContainerDataContext)
        const { formData, pageData, updateFormData } = useContext(GlobalDataContext)

        const isHidden = useHidden({pageData, formData, containerData}, isHiddenFunc)
        const isDisabled = useDisabled({pageData, formData, containerData}, isDisabledFunc)
        const name = '${schema.extraProps.name ? schema.extraProps.name.replace(/\s/g,''): undefined}'
        const value = useSetFormControlVal({
            name,
            pathToVal: ${schema.extraProps.pathToVal},
            getValue
        }, ${schema.props.defaultValue})

        const error = useSetFormErrors({
            name,
            verifyRules,
        })
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
            <${thisComponent.name} ${generateTagProps(schema.props, schema.id!)} value={value} onChange={onChange} disabled={isDisabled}/>
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