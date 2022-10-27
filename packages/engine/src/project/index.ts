import { EventEmitter } from 'eventemitter3';
import Designer from './designer';

export default class Project {
    readonly event = new EventEmitter()
    readonly designer = new Designer()
}