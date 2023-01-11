import { NpmInfo } from './material'
import { PropValue } from './Props'

export interface ProjectSchema {
    componentsTree: PageSchema,
    componentsMap: Record<string,NpmInfo>
}

export interface PageSchema extends ContainerSchema {
    containerType: 'Page';
    componentName: 'Page';
    lifeCycles: LifeCycles;
    children: LayoutSchema[];
    // 网络请求拦截器
    interceptors?: {
        request?: JSFunction,
        response?: JSFunction
    }
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
    extraProps: {
        // 容器节点的 pathToVal 和 dataSource 必须二选一
        pathToVal?: string;
        dataSource?: JSDataSource;
        name?: string;
        isDisabled?: JSFunction;
        getValue?: JSFunction;
        isHidden?: JSFunction;
        [key: string]: PropValue;
    }
    isContainer: boolean;
    children: NodeSchema[];
    isFormControl?: boolean;
    containerType?: 'Layout'|'Data'|'Page';
}

export interface DataSource {
    url: string;
    params?: object;
    method: "GET" | "POST";
    requestHandler?: JSFunction
    responseHandler?: JSFunction
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

// 它在设置面板中会运行得到函数的结果
export interface JSRunFunction {
    type: 'JSRunFunction',
    // 字符串形式的函数
    value: string
}

export interface JSDataSource {
    type: 'DataSource',
    value: DataSource
}