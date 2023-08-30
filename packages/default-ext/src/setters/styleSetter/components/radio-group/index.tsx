import * as React from 'react';

import { Radio, Popover,RadioChangeEvent } from 'antd';
import { RadioItem, onStyleChange } from '../../utils/types';
import Icon from '../icon';
import './index.less';
const RadioGroup = Radio.Group;

interface radioProps {
  dataList: Array<RadioItem>;
  styleKey: string;
  onStyleChange: onStyleChange;
  // 某些时候值并不是直接从StyleData中获取的，value值提供了外部定义的扩展
  value: string;
}

export default (props: radioProps) => {
  const { dataList, styleKey, onStyleChange, value } = props;

  const onRadioChange = (key: string, event: RadioChangeEvent) => {
    onStyleChange([
      {
        styleKey: key,
        value: event.target.value,
      },
    ]);
  };

  return (
    <div className="radiogroup-style">
      {value ? (
        <RadioGroup
          value={value}
          optionType="button"
          onChange={(val) => onRadioChange(styleKey, val)}
          aria-labelledby="groupId"
        >
          {dataList &&
            dataList.map((item: RadioItem) => (
              <Popover
                content={item.tips}
                trigger="hover"
                placement="top"
              >
                <Radio id={item.value} value={item.value}>
                    {item.icon ? <Icon type={item.icon} size="small"></Icon> : item.title}
                  </Radio>
                
              </Popover>
            ))}
        </RadioGroup>
      ) : (
        <RadioGroup
          optionType="button"
          onChange={(val) => onRadioChange(styleKey, val)}
          aria-labelledby="groupId"
        >
          {dataList &&
            dataList.map((item: RadioItem) => (
              <Popover
                content={item.tips}
                trigger="hover"
                placement="top"
              >
                <Radio id={item.value} value={item.value}>
                    {item.icon ? <Icon type={item.icon} size="small"></Icon> : item.title}
                  </Radio>
              </Popover>
            ))}
        </RadioGroup>
      )}
    </div>
  );
};
