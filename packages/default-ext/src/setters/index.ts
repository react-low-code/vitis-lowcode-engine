import StringSetter from "./stringSetter";
import TextSetter from "./textSetter";
import { RegisteredSetter } from 'vitis-lowcode-types'

export const defaultSetters: RegisteredSetter[] =  [
    StringSetter,
    TextSetter
]