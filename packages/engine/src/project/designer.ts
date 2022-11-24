import { makeAutoObservable,  } from 'mobx';
import { ComponentType } from 'react'
import { DesignerSpec } from 'vitis-lowcode-types'

import ComponentSpec from './componentSpec'
import { innerMaterial } from '../shell'
import { Dragon, isDragDataNode, isDragNode } from './dragon'
import Host from './host'
import Detection from './detection';
import type Project from './index'
import Viewport from './viewport'
import { LocationEvent } from '../types'

export default class Designer implements DesignerSpec {
    componentSpecMap: Map<string, ComponentSpec> = new Map()
    componentImplMap: Map<string, ComponentType> = new Map()

    dragon = new Dragon(this)
    host: Host
    project: Project
    viewport: Viewport
    detection: Detection = new Detection(this)

    constructor(project: Project) {
        makeAutoObservable(this, {
            dragon: false,
            project: false,
            viewport: false,
            host: false
        });

        this.project = project
        this.host = new Host(project)
        this.viewport = new Viewport()
    }

    buildComponentSpecMap = (packageNames: string[]) => {
        packageNames.forEach(packageName => {
            const result = innerMaterial.getComponentSpecRaw(packageName)

            if (result) {
                this.componentSpecMap.set(packageName, new ComponentSpec(result))
            }
        })
    }

    addComponentsImpl = (componentMap: Map<string,ComponentType >) => {
        for (const [name, component ] of componentMap) {
            this.addComponentImpl(name, component)
        }

        this.componentImplMap = new Map(this.componentImplMap)
    }

    private addComponentImpl = (name: string, component: ComponentType) => {
        if (this.componentImplMap.has(name)) {
            console.error(`${name} 的实现已经存在，即将重置！！！`)
        }
        this.componentImplMap.set(name, component)
    }

    mountViewport = (element: HTMLElement | null) => {
        this.viewport.mount(element)
    }


    getDropContainer = (locateEvent: LocationEvent) => {
        const containerNode = this.host.getClosestNodeByLocation({clientX: locateEvent.clientX, clientY: locateEvent.clientY})
        if (containerNode) {
            if (isDragDataNode(locateEvent.dragObject) && containerNode.componentSpec.isCanInclude(locateEvent.dragObject.data)) {
                return containerNode
            }

            if (isDragNode(locateEvent.dragObject) && containerNode.componentSpec.isCanInclude(locateEvent.dragObject.node.componentSpec)) {
                return containerNode
            }
        }
    }

    getNodeRect = (nodeId: string) => {
        return this.host.getNodeRect(nodeId)
    }

    getInsertRect = () => {
        const dropLocation = this.dragon.dropLocation

        if (dropLocation) {
            if (dropLocation.index === 0) {
                return this.getNodeRect(dropLocation.containerNode.id)
            } else {
                return this.getNodeRect(dropLocation.containerNode.children[dropLocation.index].id)
            }
        }
    }
}
