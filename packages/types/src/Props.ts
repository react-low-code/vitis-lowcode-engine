export interface PropRaw {
    name: string;
    propType: PropType;
    defaultValue?: any;
    description?: string;
    setter: SetterConfig[] | SetterConfig;
    isHidden: boolean;
}

interface PropType {
    type:'array' | 'bool' | 'func' | 'number' | 'object' | 'string' | 'node' | 'element' | 'any' | 'oneOf' | 'oneOfType' | 'arrayOf'
    isRequired?: boolean;
    value?: PropType[] | PropType | Array<string | number | boolean>;
    [k: string]: any;
}

interface SetterConfig {
    /**设置器的名称 */
    setterName: string;
    /**是否使用组件包自带的设置器 */
    isUseSelf?: boolean;
    /**传递给设置器的属性 */
    props?: object;
}

export interface PropValue {

}