import { makeAutoObservable,  } from 'mobx';
import { ElementType } from 'react'
import { DesignerSpec } from 'vitis-lowcode-types'

import ComponentSpec from './componentSpec'
import { innerMaterial } from '../shell'
import { Dragon, isDragDataNode } from './dragon'
import Host from './host'
import Detection from './detection';
import type Project from './index'
import Viewport from './viewport'
import { LocationEvent } from '../types'
import SettingTopEntry from '../setting/SettingTopEntry'

export default class Designer implements DesignerSpec {
    componentSpecMap: Map<string, ComponentSpec> = new Map()
    componentImplMap: Map<string, ElementType> = new Map()

    dragon = new Dragon(this)
    host: Host
    project: Project
    viewport: Viewport
    detection: Detection = new Detection(this)
    settingTopEntry?: SettingTopEntry

    constructor(project: Project) {
        makeAutoObservable(this, {
            dragon: false,
            project: false,
            viewport: false,
            host: false,
            componentImplMap: false
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

    addComponentsImpl = (componentMap: Map<string,ElementType >) => {
        for (const [name, component ] of componentMap) {
            this.addComponentImpl(name, component)
        }
    }

    private addComponentImpl = (name: string, component: ElementType) => {
        if (this.componentImplMap.has(name)) {
            console.error(`${name} 的实现已经存在，即将重置！！！`)
        }
        this.componentImplMap.set(name, component)
    }

    mountViewport = (element: HTMLElement | null) => {
        this.viewport.mount(element)
    }


    getDropContainer = (locateEvent: LocationEvent) => {
        let containerNode = this.host.getClosestNodeByLocation({clientX: locateEvent.clientX, clientY: locateEvent.clientY})
        const thisComponentSpec: ComponentSpec = isDragDataNode(locateEvent.dragObject) ? locateEvent.dragObject.data: locateEvent.dragObject.node.componentSpec
        
        while(containerNode) {
            if (containerNode.componentSpec.isCanInclude(thisComponentSpec)) {
                return containerNode
            } else {
                containerNode = containerNode.parent
            }
        }
    }

    getNodeRect = (nodeId: string) => {
        return this.host.getNodeRect(nodeId)
    }

    getInsertPointRect = () => {
        const dropLocation = this.dragon.dropLocation

        if (dropLocation) {
            const { containerNode, index } = dropLocation
            if (index === 0) {
                return this.getNodeRect(containerNode.id)
            } 
            // 插到容器的最后一个位置
            else if (index >= containerNode.childrenSize) {
                const lastChild = containerNode.lastChild
                const lastChildRect = lastChild ? this.getNodeRect(lastChild.id): undefined
                return lastChildRect ? new DOMRect(lastChildRect.x, lastChildRect.y + lastChildRect.height, lastChildRect.width, lastChildRect.height): undefined
            } else {
                const child = containerNode.getChildAtIndex(index)
                return child ? this.getNodeRect(child.id): undefined
            }
        }
    }

    selectNode = (nodeId?: string) => {
        this.project.documentModel.selectNode(nodeId)
        this.detection.computeSelectedPosition(nodeId)
        this.settingTopEntry = nodeId ? this.project.documentModel.getNode(nodeId)?.settingEntry: undefined
    }

    rerender = () => {
        return this.host.rerender()
    }
}
