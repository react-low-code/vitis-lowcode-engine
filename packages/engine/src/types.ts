import type ComponentSpec from './project/componentSpec'

export enum DragObjectType {
    // eslint-disable-next-line no-shadow
    Node = 'node',
    NodeData = 'nodedata',
}

export interface DragNodeObject {
    type: DragObjectType.Node;
    nodes: Node[];
  }
  export interface DragNodeDataObject {
    type: DragObjectType.NodeData;
    data: ComponentSpec;
    thumbnail?: string;
    description?: string;
    [extra: string]: any;
  }

export type DragObject = DragNodeObject | DragNodeDataObject

export interface LocationEvent {
  type: 'LocateEvent',
  dragObject: DragObject,
  target?: EventTarget | null,
  originalEvent: DragEvent,
  clientX: number,
  clientY: number
}