import type ComponentSpec from './project/componentSpec'
import type Node from './node';

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
  containerRect: DOMRect;
}