
import { NodeSchema } from 'vitis-lowcode-types'

export function generateTagProps(props: NodeSchema['props'], id: string) {
    return `id='${id}'`
}

type DataSourceConfig = NodeSchema['extraProps']['dataSource']

export function generateUseDataSource(dataSourceConf: DataSourceConfig, pathToVal?: string, containerData?: any) {
    const dataSource = dataSourceConf?.value
    
    if (!dataSource) {
        return `const { loading, data } = useDataSource(undefined, ${pathToVal}, ${containerData? containerData: undefined})`
    }
    return `const { loading, data } = useDataSource({
        url: ${dataSource.url},
        params: ${dataSource.params},
        method: ${dataSource.method},
        requestHandler: ${dataSource.requestHandler?.value? dataSource.requestHandler?.value: undefined},
        responseHandler: ${dataSource.responseHandler?.value? dataSource.responseHandler?.value: undefined},
        errorHandler: ${dataSource.errorHandler?.value? dataSource.errorHandler?.value: undefined},
    }, ${pathToVal}, ${containerData? containerData: undefined})`
}

export function generateComponentRef(schema: NodeSchema) {
    const id = schema.id!
    if (schema.isContainer) {
        if (schema.containerType === 'Layout') {
            return {
                path: `./components/LayoutContainer${id}.tsx`,
                name: `LayoutContainer${id}`,
                key: id
            }
        } else if (schema.containerType === 'Data') {
            return {
                path: `./components/DataContainer${id}.tsx`,
                name: `DataContainer${id}`,
                key: id
            }
        } else {
            return undefined
        }
    } else {
        if (schema.isFormControl) {
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
}