import { EventEmitter } from 'eventemitter3';
import Designer from './designer';
import Host from './host'

export default class Project extends EventEmitter{
    readonly designer = new Designer()
    readonly host = new Host()

}