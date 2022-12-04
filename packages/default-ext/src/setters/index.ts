import StringSetter from "./stringSetter";
import TextSetter from "./textSetter";
import StyleSetter from "./styleSetter";
import RadioSetter from './radioSetter'

import { RegisteredSetter } from 'vitis-lowcode-types'

export const defaultSetters: RegisteredSetter[] =  [
    StringSetter,
    TextSetter,
    StyleSetter,
    RadioSetter
]