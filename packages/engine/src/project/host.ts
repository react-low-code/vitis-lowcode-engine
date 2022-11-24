import { project, material, setters } from "../shell"
import { DRAG_OVER, ASSET_UPDATED } from '../eventType'
import type Project from "./index"
import { HostSpec, SimulatorSpec, ComponentSpecRaw, Point } from 'vitis-lowcode-types'
import { IReactionPublic, autorun } from 'mobx'
import { getComponentImplUrl, getBaseAssets, getComponentSetterMap, getComponentImplFromWin } from '../utils'
import { isDragDataNode } from './dragon'

export default class Host implements HostSpec {
    frameDocument?: Document | null
    frameWindow?: Window | null
    readonly project: Project
    private renderer: SimulatorSpec

    constructor(project: Project) {
        this.project = project

    }

    onAssetUpdated = (additionalPackageNames: string[]) => {
        // todo
    }

    mountContentFrame = async (frame: HTMLIFrameElement | null) => {
        if (!frame) {
            return 
        }

        this.frameDocument = frame.contentDocument
        this.frameWindow = frame.contentWindow
    

        const render = await this.createSimulator()

        material.off(ASSET_UPDATED, this.onAssetUpdated).on(ASSET_UPDATED, this.onAssetUpdated)
        this.setupEvent()

        render.run()

    }

    private setupEvent = () => {
        this.frameDocument?.addEventListener('dragover', (e: DragEvent) => {
            e.preventDefault()
            project.emit(DRAG_OVER)
            this.project.designer.dragon.onDragOver(e)
        })

        this.frameDocument?.addEventListener('mousemove', (e: MouseEvent) => {
            this.project.designer.detection.capture(e)
        })

        this.frameDocument?.addEventListener('mouseleave', (e: MouseEvent) => {
            this.project.designer.detection.release()
            this.project.documentModel.selectNode()
        }, false)


        this.frameDocument?.addEventListener('drop', async (e: DragEvent) => {
            const {dragObject, dropLocation} = this.project.designer.dragon
            if (dragObject && dropLocation) {
                if (isDragDataNode(dragObject)) {
                    const node = this.project.documentModel.createNode(dragObject.data.schema, dropLocation.containerNode)
                    dropLocation.containerNode.inertChildAtIndex(node, dropLocation.index)
                    await this.rerender()
                    this.project.designer.detection.computedRectByNode(node.id)
                    this.project.documentModel.selectNode(node.id)
                }
            }
            this.project.designer.dragon.onDragEnd(e)
        })

        this.frameDocument?.addEventListener('mouseup', (e: MouseEvent) => {
            this.project.documentModel.selectNode(this.getClosestNodeByLocation(e)?.id)
        })
    }

    private getSimulatorComponentAssets = (assetMap: Map<string, ComponentSpecRaw>) => {
        const result: {packageName: string, componentName: string, url: string}[] = []

        for (const [key, spec] of assetMap) {
            result.push({
                packageName: spec.packageName,
                componentName: spec.componentName,
                url: getComponentImplUrl({npm: spec.packageName, version: spec.version})
            })
        }

        return result
    }

    /**
     * 注册组件包自带的设置器
     */
    private registerComponentSetters = (assetBundles: {packageName: string, componentName: string, url: string}[]) => {
        assetBundles.forEach(bundle => {
            const innerSetterMap = getComponentSetterMap(this.frameWindow!, bundle)
            for (const key of Object.keys(innerSetterMap)) {
                setters.register({
                    name: `${bundle.packageName}/${key}`,
                    view: innerSetterMap[key],
                })
            }
        })
    }

    /**
     * 收集低代码组件的实现
     * @param assetBundles 
     */
    private collectComponentImpl = (assetBundles: {packageName: string, componentName: string, url: string}[]) => {
        const componentMap = new Map()

        assetBundles.forEach(bundle => {
            componentMap.set(bundle.componentName, getComponentImplFromWin(this.frameWindow!, bundle))
        })

        this.project.designer.addComponentsImpl(componentMap)
    }

    private createSimulator = async () => {
        const assetBundles = this.getSimulatorComponentAssets(material.getAll());
        const baseAssets = getBaseAssets()

        // 这个属性在模拟器内部要访问
        this.frameWindow!.LCSimulatorHost = this
        let styleTags = ''
        let scriptTags = ''
        baseAssets.css.forEach(url => {
            styleTags += `<link href="${url}" rel="stylesheet" />`
        })
        baseAssets.js.forEach(url => {
            scriptTags += `<script src="${url}"></script>`
        })

        assetBundles.forEach(bundle => {
            scriptTags += `<script src="${bundle.url}"></script>`
        })

        this.frameDocument!.open()
        this.frameDocument!.write(
            `<!doctype html>
            <html class="engine-design-mode">
            <head><meta charset="utf-8"/>
                ${styleTags}
            </head>
            <body>
                ${scriptTags}
            </body>
            </html>`
        )
        this.frameDocument!.close()

        return new Promise<SimulatorSpec>((resolve, rejected) => {
            const loaded = () => {
              this.registerComponentSetters(assetBundles)
              this.collectComponentImpl(assetBundles)
              resolve(this.frameWindow!.SimulatorRenderer);
              this.frameWindow!.removeEventListener('load', loaded);
            };

            const errored = () => {
                rejected()
                this.frameWindow!.removeEventListener('error', errored);
            }
            this.frameWindow!.addEventListener('load', loaded);
            this.frameWindow!.addEventListener('error', errored);
        });
    }

    connect = (renderer: SimulatorSpec, effect: (reaction: IReactionPublic) => void) => {
        this.renderer = renderer

        autorun(effect)
    }

    getClosestNodeByLocation = (point: Point) => {
        const id = this.renderer.getClosestNodeIdByLocation(point)
        return id ? this.project.documentModel.getNode(id): undefined
    }

    getNodeRect = (nodeId: string) => {
        return this.renderer.getNodeRect(nodeId)
    }

    rerender = async () => {
        await this.renderer.rerender()
    }
}