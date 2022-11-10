import { project, material, setters } from "../shell"
import { DRAG_OVER, ASSET_UPDATED } from '../eventType'
import type Project from "./index"
import { DesignerSpec, SimulatorSpec, ComponentSpecRaw } from 'vitis-lowcode-types'
import { getComponentImplUrl, getBaseAssets, getComponentSetterMap } from '../utils'

export default class Host implements DesignerSpec{
    frameDocument?: Document | null
    frameWindow?: Window | null
    readonly project: Project
    private renderer: SimulatorSpec

    constructor(project: Project) {
        this.project = project

    }

    mountContentFrame = async (frame: HTMLIFrameElement | null) => {
        if (!frame) {
            return 
        }

        this.frameDocument = frame.contentDocument
        this.frameWindow = frame.contentWindow
    

        await this.createSimulator()

        material.off(ASSET_UPDATED).on(ASSET_UPDATED, (additionalPackageNames: string[]) => {
            // todo
        })

        this.frameDocument?.addEventListener('dragover', () => {
            project.emit(DRAG_OVER)
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

    private createSimulator = async () => {
        const assetBundles = this.getSimulatorComponentAssets(material.getAll());
        const baseAssets = getBaseAssets()

        // 注册组件包自带的设置器
        const regComponentSetters = () => {
            assetBundles.forEach(bundle => {
                getComponentSetterMap(this.frameWindow!, bundle)
                
                const innerSetterMap = getComponentSetterMap(this.frameWindow!, bundle)
                for (const key of Object.keys(innerSetterMap)) {
                    setters.register({
                        name: `${bundle.packageName}/${key}`,
                        view: innerSetterMap[key],
                    })
                }
            })
        }

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

        return new Promise<void>((resolve, rejected) => {
            const loaded = () => {
              regComponentSetters()
              resolve();
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

    connect(renderer: SimulatorSpec) {
        this.renderer = renderer
    }


}