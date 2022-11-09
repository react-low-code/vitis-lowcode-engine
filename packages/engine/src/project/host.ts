import { project } from "../shell"
import { DRAG_OVER } from '../eventType'
import type Project from "./index"

export default class Host {
    frameDocument?: Document | null
    readonly project: Project

    constructor(project: Project) {
        this.project = project
    }

    mountContentFrame(frame: HTMLIFrameElement | null) {
        if (!frame) {
            return 
        }
        this.frameDocument = frame.contentDocument

        this.frameDocument?.addEventListener('dragover', () => {
            project.emit(DRAG_OVER)
        })
    }
}