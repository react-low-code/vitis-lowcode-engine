import * as React from 'react';
import './index.less';
import { Input } from 'antd';
import { StyleData, onStyleChange } from '../../utils/types';
import { addUnit, removeUnit } from '../../utils';

const KEY_ARROW_DOWN = 'ArrowDown';
const KEY_ARROW_UP = 'ArrowUp';

interface layoutBoxProps {
  styleData: StyleData | any;
  onStyleChange: onStyleChange;
  unit?: 'px';
}

export default (props: layoutBoxProps) => {
  const { onStyleChange, unit = 'px', styleData } = props;
  const onInputChange = (styleKey: string, value: string) => {
    if (value != '') {
      // 判断是否是数字
      if (!isNaN(parseInt(value))) {
        onStyleChange([
          {
            styleKey,
            value: addUnit(value, unit),
          },
        ]);
      }
    } else {
      onStyleChange([
        {
          styleKey,
          value: undefined,
        },
      ]);
    }
  };

  const onInputKeyDown = (key: string, styleKey: string) => {
    const { onStyleChange, unit = 'px', styleData } = props;
    const value = styleData[styleKey] || 0;
    if (key == KEY_ARROW_DOWN) {
      onStyleChange([
        {
          styleKey,
          value: addUnit(parseInt(value) - 1, unit),
        },
      ]);
    } else if (key == KEY_ARROW_UP) {
      onStyleChange([
        {
          styleKey,
          value: addUnit(parseInt(value) + 1, unit),
        },
      ]);
    }
  };

  return (
    <div className="layout-box-container">
      <div className="margin-top-div">
        <Input
          className="next-noborder"
          placeholder="0"
          maxLength={3}
          value={removeUnit(styleData['marginTop'])}
          onChange={(event) => onInputChange('marginTop', event.target.value)}
          onKeyDown={(e) => onInputKeyDown(e.key, 'marginTop')}
        ></Input>
      </div>
      <div className="margin-right-div">
        <Input
          className="next-noborder"
          placeholder="0"
          maxLength={3}
          value={removeUnit(styleData['marginRight'])}
          onChange={(event) => onInputChange('marginRight', event.target.value)}
          onKeyDown={(e) => onInputKeyDown(e.key, 'marginRight')}
        ></Input>
      </div>
      <div className="margin-bottom-div">
        <span className="help-txt">MARGIN</span>
        <Input
          className="next-noborder"
          placeholder="0"
          maxLength={3}
          value={removeUnit(styleData['marginBottom'])}
          onChange={(event) => onInputChange('marginBottom', event.target.value)}
          onKeyDown={(e) => onInputKeyDown(e.key, 'marginBottom')}
        ></Input>
      </div>
      <div className="margin-left-div">
        <Input
          className="next-noborder"
          placeholder="0"
          maxLength={3}
          value={removeUnit(styleData['marginLeft'])}
          onChange={(event) => onInputChange('marginLeft', event.target.value)}
          onKeyDown={(e) => onInputKeyDown(e.key, 'marginLeft')}
        ></Input>
      </div>
      <div className="padding-top-div">
        <Input
          className="next-noborder"
          placeholder="0"
          maxLength={3}
          value={removeUnit(styleData['paddingTop'])}
          onChange={(event) => onInputChange('paddingTop', event.target.value)}
          onKeyDown={(e) => onInputKeyDown(e.key, 'paddingTop')}
        ></Input>
      </div>
      <div className="padding-right-div">
        <Input
          className="next-noborder"
          placeholder="0"
          maxLength={3}
          value={removeUnit(styleData['paddingRight'])}
          onChange={(event) => onInputChange('paddingRight', event.target.value)}
          onKeyDown={(e) => onInputKeyDown(e.key, 'paddingRight')}
        ></Input>
      </div>
      <div className="padding-bottom-div">
        <span className="help-txt">PADDING</span>
        <Input
          className="next-noborder"
          placeholder="0"
          maxLength={3}
          value={removeUnit(styleData['paddingBottom'])}
          onChange={(event) => onInputChange('paddingBottom', event.target.value)}
          onKeyDown={(e) => onInputKeyDown(e.key, 'paddingBottom')}
        ></Input>
      </div>
      <div className="padding-left-div">
        <Input
          className="next-noborder"
          placeholder="0"
          maxLength={3}
          value={removeUnit(styleData['paddingLeft'])}
          onChange={(event) => onInputChange('paddingLeft', event.target.value)}
          onKeyDown={(e) => onInputKeyDown(e.key, 'paddingLeft')}
        ></Input>
      </div>
    </div>
  );
};
