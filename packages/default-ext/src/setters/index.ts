import StringSetter from "./stringSetter";
import TextSetter from "./textSetter";
import StyleSetter from "./styleSetter";
import RadioGroupSetter from './radioGroupSetter'
import FunctionSetter from "./functionSetter";

import { RegisteredSetter } from 'vitis-lowcode-types'

export const defaultSetters: RegisteredSetter[] =  [
    StringSetter,
    TextSetter,
    StyleSetter,
    RadioGroupSetter,
    FunctionSetter
]