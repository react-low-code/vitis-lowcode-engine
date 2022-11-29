import type ComponentSpec from './project/componentSpec'
import type Node from './node';
import { JSFunction, SetterConfig } from 'vitis-lowcode-types'

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
  title: string;
  fields?: FieldConfig[];
  setters?: {
    name: string;
    props: SetterConfig['props']
  }[];
  name: string;
  initialValue?: JSFunction | string | number
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