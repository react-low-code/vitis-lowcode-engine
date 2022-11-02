import { EventEmitter } from 'eventemitter3';
import Designer from './designer';

export default class Project extends EventEmitter{
    readonly designer = new Designer()
}