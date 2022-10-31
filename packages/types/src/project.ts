import EventEmitter from 'eventemitter3';

export interface ProjectSpec {
    emit(eventName: symbol, ...arg: any[]): boolean
    on(eventName: symbol, fn: (...args: any[]) => void): EventEmitter
    off(eventName: symbol, fn?: (...args: any[]) => void): EventEmitter
}