import { NpmInfo } from './material'
import { PropValue } from './Props'

export interface ProjectSchema {
    componentsTree: PageSchema,
    componentsMap: Record<string,NpmInfo>
}

export interface PageSchema extends ContainerSchema {
    containerType: 'Page';
    componentName: 'Page';
    children: LayoutSchema[]
}

export interface LayoutSchema extends ContainerSchema {
    containerType: 'Layout';
    children: ComponentSchema[] | DataContainerSchema[]
}

export interface DataContainerSchema extends ContainerSchema {
    containerType: 'Data';
    componentName: 'DataBlock';
    children: ComponentSchema[]
}

export interface ContainerSchema extends NodeSchema{
    isContainer: true;
    containerType: 'Layout'|'Data'|'Page'
    // pathToVal 和 dataSource 必须二选一
    dataSource?: DataSource;
    lifeCycles?: LifeCycles;
    children: ComponentSchema[] | ContainerSchema[]
}

export interface ComponentSchema extends NodeSchema {
    isContainer: false;
    name?: string;
    isDisabled?: JSFunction;
    getValue?: JSFunction;
    isFormControl?: boolean;
}

export interface NodeSchema {
    id?: string;
    componentName: string;
    packageName: string;
    props: {[key: string]: PropValue;}
    isContainer: boolean;
    children: NodeSchema[];
    pathToVal?: string;
    isFormControl?: boolean;
    isHidden?: JSFunction;
    containerType?: 'Layout'|'Data'|'Page';
}

export interface DataSource {
    url: string;
    params?: object;
    method: string;
    requestHandler: JSFunction
    responseHandler: JSFunction
    errorHandler?: JSFunction
}

export interface JSFunction {
    type: 'JSFunction',
    // 字符串形式的函数
    value: string
}

export interface LifeCycles {
    load?: JSFunction;
    unload?: JSFunction;
    visibilitychange?: JSFunction;
    beforeunload?: JSFunction;
}