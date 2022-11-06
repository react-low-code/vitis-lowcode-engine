import {project} from "../shell"
import { DRAG_OVER } from '../eventType'

export default class Host {
    frameDocument?: Document | null

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