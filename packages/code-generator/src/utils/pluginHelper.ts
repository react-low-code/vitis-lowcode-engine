
import { NodeSchema } from 'vitis-lowcode-types'

export function generateTagProps(props: NodeSchema['props'], id: string) {
    return `id=${id}`
}

type DataSourceConfig = NodeSchema['extraProps']['dataSource']

export function generateUseDataSource(dataSourceConf: DataSourceConfig, pathToVal?: string, containerData?: any) {
    const dataSource = dataSourceConf?.value
    
    if (!dataSource) {
        return ''
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