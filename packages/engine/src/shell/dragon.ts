import type { Dragon as InnerDragon } from '../project/dragon'
import { DragonSpec } from 'vitis-lowcode-types'
import { DragObjectType } from '../types'
// import { DragEvent } from 'react'

export default class Dragon implements DragonSpec{
    private readonly innerDragon: InnerDragon

    constructor(innerDragon: InnerDragon) {
        this.innerDragon = innerDragon
    }

    // bindDrag = (sourceNode: Element, boost: (e: MouseEvent | DragEvent) => DragObject) =>  {
    //     return this.innerDragon.bindDrag(sourceNode, boost)
    // }

    bindNodeDataDrag = (packageName: string) => {
        if (this.innerDragon.designer.componentSpecMap.has(packageName)) {
            this.innerDragon.bindDragStart({
                type: DragObjectType.NodeData,
                data: this.innerDragon.designer.componentSpecMap.get(packageName)!
            })
        }
        
    }
}