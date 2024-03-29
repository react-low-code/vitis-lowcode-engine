import { NpmInfo } from './material'
import { PropValue } from './Props'

export interface ProjectSchema {
    componentsTree: PageSchema,
    componentsMap: Record<string,NpmInfo>,
    projectName: string,
    title: string,
    description: string
}

export interface PageSchema extends ContainerSchema {
    containerType: 'Page';
    componentName: 'Page';
    lifeCycles: LifeCycles;
    interceptors: Interceptors;
    children: LayoutSchema[];
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

export interface ExtraProps {
    // 容器节点的 pathToVal 和 dataSource 必须二选一
    pathToVal?: string;
    dataSource?: JSDataSource;
    name?: string;
    // 禁用联动规则
    isDisabled?: JSFunction;
    // 求值联动规则
    getValue?: JSFunction;
    // 隐藏联动规则
    isHidden?: JSFunction;
    verifyRules?: Rule[],
    [key: string]: PropValue;
}

export interface NodeSchema {
    id?: string;
    componentName: string;
    packageName: string;
    props: {[key: string]: PropValue;}
    extraProps: ExtraProps,
    isContainer: boolean;
    children: NodeSchema[];
    isFormControl?: boolean;
    containerType?: 'Layout'|'Data'|'Page';
    // 网络请求拦截器，只有页面容器才有
    interceptors?: Interceptors
    // 生命周期，只有页面容器才有
    lifeCycles?: LifeCycles;
}

export type DataSource = {
    url: string;
    params?: object;
    method: "GET" | "POST";
    requestHandler?: JSFunction
    responseHandler?: JSFunction
    errorHandler?: JSFunction
}

export type JSFunction = {
    type: 'JSFunction',
    // 字符串形式的函数
    value: string
}

export type LifeCycles = {
    load?: JSFunction;
    unload?: JSFunction;
    visibilitychange?: JSFunction;
    beforeunload?: JSFunction;
}

// 它在设置面板中会运行得到函数的结果
export type JSRunFunction = {
    type: 'JSRunFunction',
    // 字符串形式的函数
    value: string
}

export type JSDataSource = {
    type: 'DataSource',
    value: DataSource
}

export type Interceptors = {
    request?: JSFunction,
    response?: JSFunction
}

export type Rule = {
    max?: string;
    min?: string;
    required?: boolean;
    //  校验没有通过时的提示语
    message?: string;
    // 自定义的校验规则
    customized?: JSFunction;
}