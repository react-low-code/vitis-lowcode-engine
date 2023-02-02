import React, { ChangeEvent } from 'react'
import { SetterCommonProps, Rule } from 'vitis-lowcode-types'
import { Checkbox, InputNumber, Input } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import MonacoEditor from 'vitis-lowcode-monaco-editor'
import './index.less'

export interface Props extends SetterCommonProps {
    value: Rule[] | undefined;
    // 在这里写设置器特有的props
    [attr: string]: any;
}


function VerifyRulesSetter(props: Props) {
    const rules = props.value || []
    const requiredRule = rules.find(rule => rule.required !== undefined)
    const minLenRule = rules.find(rule => rule.min !== undefined)
    const maxLenRule = rules.find(rule => rule.max !== undefined)
    const customizedRule = rules.find(rule => rule.customized !== undefined)

    const checkRequired = (event: CheckboxChangeEvent) => {
        if (props.onChange) {
            if (event.target.checked) {
                props.onChange(rules.concat({required: true, message: '这是必填字段'}))
            } else {
                props.onChange(rules.filter(rule => rule.required === undefined))
            }
        }
    }

    const checkMinLen = (event: CheckboxChangeEvent) => {
        if (props.onChange) {
            if (event.target.checked) {
                props.onChange(rules.concat({min: '20', message: '至少20个字符'}))
            } else {
                props.onChange(rules.filter(rule => rule.min === undefined))
            }
        }
    }

    const changeMinLen = (val: string | null) => {
        if (val === null) {
            val = ''
        }

        if (props.onChange) {
            props.onChange(rules.map(rule => {
                if (rule.min !== undefined) {
                    return {min: val,message: `至少${val}个字符`}
                } else { 
                    return rule 
                }
            }))
        }
    }

    const checkMaxLen = (event: CheckboxChangeEvent) => {
        if (props.onChange) {
            if (event.target.checked) {
                props.onChange(rules.concat({max: '100', message: '最多100个字符'}))
            } else {
                props.onChange(rules.filter(rule => rule.max === undefined))
            }
        }
    }

    const changeMaxLen = (val: string | null) => {
        if (val === null) {
            val = ''
        }

        if (props.onChange) {
            props.onChange(rules.map(rule => {
                if (rule.max !== undefined) {
                    return {max: val,message: `最多${val}个字符`}
                } else { 
                    return rule 
                }
            }))
        }
    }

    const checkCustomized = (event: CheckboxChangeEvent) => {
        if (props.onChange) {
            if (event.target.checked) {
                props.onChange(rules.concat({customized: {
                    type: "JSFunction",
                    value: `function customized(value, fromData) {
                    return { message: '', status: true }
                    }`
                }}))
            } else {
                props.onChange(rules.filter(rule => rule.customized === undefined))
            }
        }
    }

    const changeCustomized = (value: string) => {
        if (props.onChange) {
            props.onChange(rules.map(rule => {
                if (rule.customized !== undefined) {
                    return {...rule, customized: {
                        type: 'JSFunction',
                        value: value
                    }}
                } else { 
                    return rule 
                }
            }))
        }
    }

    const changeMessage = (ruleType: keyof Rule) => (event: ChangeEvent<HTMLInputElement>) => {
        if (props.onChange) {
            props.onChange(rules.map(rule => {
                if (rule[ruleType] !== undefined) {
                    return {...rule, message: event.target.value}
                } else { 
                    return rule 
                }
            }))
        }
    }

    return (
    <div>
        <div className='vitis-rule-item'>
            <Checkbox checked={!!requiredRule} onChange={checkRequired}>必填</Checkbox>
            {!!requiredRule && <div className='message'>
                <Input prefix="错误提示：" value={requiredRule.message} onChange={changeMessage('required')} size="small"/>
            </div>}
        </div>
        <div className='vitis-rule-item'>
            <Checkbox checked={!!minLenRule} onChange={checkMinLen}>最小长度</Checkbox>
            {!!minLenRule && <InputNumber value={minLenRule.min} onChange={changeMinLen} size="small"/>}
            {!!minLenRule && <div className='message'>
                <Input prefix="错误提示：" value={minLenRule.message} onChange={changeMessage('min')} size="small"/>
            </div>}
        </div>
        <div className='vitis-rule-item'>
            <Checkbox checked={!!maxLenRule} onChange={checkMaxLen}>最大长度</Checkbox>
            {!!maxLenRule && <InputNumber value={maxLenRule.max} onChange={changeMaxLen} size="small"/>}
            {!!maxLenRule && <div className='message'>
                <Input prefix="错误提示：" value={maxLenRule.message} onChange={changeMessage('max')} size="small"/>
            </div>}
        </div>
        <div className='vitis-rule-item'>
            <Checkbox checked={!!customizedRule} onChange={checkCustomized}>自定义规则</Checkbox>
            {!!customizedRule && <MonacoEditor language='javascript' onBlur={changeCustomized} value={customizedRule.customized!.value}/>}
        </div>
    </div>
    )
}

export default {
    view: VerifyRulesSetter,
    name: "VerifyRulesSetter"
}