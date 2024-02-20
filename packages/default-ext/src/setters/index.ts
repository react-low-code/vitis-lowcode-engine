import StringSetter from "./stringSetter";
import TextSetter from "./textSetter";
import StyleSetter from "./styleSetter";
import RadioGroupSetter from './radioGroupSetter'
import FunctionSetter from "./functionSetter";
import JsonSetter from "./jsonSetter";
import VerifyRulesSetter from "./verifyRulesSetter";
import SelectSetter from "./selectSetter"
import BoolSetter from "./boolSetter"
import TextAreaSetter from './textAreaSetter'
import NumberSetter from "./numberSetter";
import DataSourceSetter from './dataSourceSetter'

import { RegisteredSetter } from 'vitis-lowcode-types'

export const defaultSetters: RegisteredSetter[] =  [
    StringSetter,
    TextSetter,
    StyleSetter,
    RadioGroupSetter,
    FunctionSetter,
    JsonSetter,
    VerifyRulesSetter,
    SelectSetter,
    BoolSetter,
    TextAreaSetter,
    NumberSetter,
    DataSourceSetter
]