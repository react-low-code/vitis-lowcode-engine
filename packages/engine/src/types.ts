import type ComponentSpec from './project/componentSpec'
import type Node from './node';
import { SetterConfig } from 'vitis-lowcode-types'

export enum DragObjectType {
    // eslint-disable-next-line no-shadow
    Node = 'node',
    NodeData = 'nodedata',
}

export interface DragNodeObject {
    type: DragObjectType.Node;
    node: Node;
  }
  export interface DragNodeDataObject {
    type: DragObjectType.NodeData;
    data: ComponentSpec;
  }

export type DragObject = DragNodeObject | DragNodeDataObject

export interface LocationEvent {
  dragObject: DragObject,
  originalEvent: DragEvent,
  clientX: number,
  clientY: number
}

export interface DropLocation {
  index: number;
  containerNode: Node;
}

export interface FieldConfig {
  type: 'group' | 'field';
  hiddenTitle?: boolean;
  // 当 type 为 'field' 时才可能给 isExtra 赋值
  // isExtra 为 true，意味着这个字段的值不会传给组件 props
  isExtra?: boolean;
  title: string;
  fields?: FieldConfig[];
  setters?: {
    name: string;
    props?: SetterConfig['props']
  }[];
  name: string;
  // 如果字段直接位于 props 或 extraProps 下，就不需要配置 parentName，其他情况要配置
  parentName?:string;
}

export interface FieldGroupConfig extends FieldConfig {
  type: 'group';
  fields: FieldConfig[];
}

export interface FieldSingleConfig extends FieldConfig {
  type: 'field';
  setters?: {
    name: string;
    props: SetterConfig['props']
  }[];
}