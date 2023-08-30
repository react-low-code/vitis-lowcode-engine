import * as React from 'react';
import { InputNumber } from 'antd';
import { StyleData, onStyleChange } from '../../utils/types';
import { addUnit, removeUnit, isEmptyValue } from '../../utils';
interface numberProps {
  styleKey: string;
  styleData: StyleData | any;
  onStyleChange: onStyleChange;
  unit?: string;
  min?: number;
  max?: number;
  style?: any;
  className?: string;
  field?: any;
  placeholderScale?: number;
  useComputedStyle?: boolean;
}

export default (props: numberProps) => {
  const {
    styleData,
    styleKey,
    unit,
    onStyleChange,
    min,
    max,
    style = {},
    className = '',
    placeholderScale,
  } = props;


  const onNumberChange = (styleKey: string, value: number, unit?: string) => {
    onStyleChange([
      {
        styleKey,
        value: unit ? addUnit(value, unit) : value,
      },
    ]);
  };


  return (
    <InputNumber
      style={style}
      className={className}
      value={unit ? removeUnit(styleData[styleKey]) : styleData[styleKey]}
      min={isEmptyValue(min) ? Number.MIN_SAFE_INTEGER : min}
      max={isEmptyValue(max) ? Number.MAX_SAFE_INTEGER : max}
      onChange={(val) => onNumberChange(styleKey, val, unit)}
      addonAfter={unit ? unit : ''}
    ></InputNumber>
  );
};
