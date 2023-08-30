import * as React from 'react';
import { Input } from 'antd';
import { StyleData, onStyleChange } from '../../utils/types';
import positionConfig from './config.json';
import Row from '../../components/row';
import { addUnit, removeUnit } from '../../utils';
import './index.less';
const KEY_ARROW_DOWN = 'ArrowDown';
const KEY_ARROW_UP = 'ArrowUp';

interface positionBoxProps {
  styleData: StyleData | any;
  onStyleChange: onStyleChange;
  unit?: 'px';
}

export default (props: positionBoxProps) => {
  const { onStyleChange, styleData, unit = 'px' } = props;
  const { positionTemplete } = positionConfig;
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

  const onPositionTempleteChange = (styleDataList: Array<StyleData>) => {
    // 解析模板的值
    styleDataList.map((item) => {
      if (item.value == 'topLeft') {
        onStyleChange([
          {
            styleKey: 'top',
            value: 0,
          },
          {
            styleKey: 'left',
            value: 0,
          },
          {
            styleKey: 'bottom',
            value: undefined,
          },
          {
            styleKey: 'right',
            value: undefined,
          },
        ]);
      } else if (item.value === 'topRight') {
        onStyleChange([
          {
            styleKey: 'top',
            value: 0,
          },
          {
            styleKey: 'left',
            value: undefined,
          },
          {
            styleKey: 'bottom',
            value: undefined,
          },
          {
            styleKey: 'right',
            value: 0,
          },
        ]);
      } else if (item.value === 'bottomLeft') {
        onStyleChange([
          {
            styleKey: 'top',
            value: undefined,
          },
          {
            styleKey: 'left',
            value: 0,
          },
          {
            styleKey: 'bottom',
            value: 0,
          },
          {
            styleKey: 'right',
            value: undefined,
          },
        ]);
      } else if (item.value === 'bottomRight') {
        onStyleChange([
          {
            styleKey: 'top',
            value: undefined,
          },
          {
            styleKey: 'left',
            value: undefined,
          },
          {
            styleKey: 'bottom',
            value: 0,
          },
          {
            styleKey: 'right',
            value: 0,
          },
        ]);
      }
      return item;
    });
  };

  return (
    <div>
      {styleData['position'] && styleData['position'] === 'absolute' && (
        <Row
          dataList={positionTemplete.dataList}
          onStyleChange={onPositionTempleteChange}
          styleKey={'positionTemplete'}
        />
      )}

      <div className="position-box-container">
        <div className="top-div">
          <Input
            className="next-noborder"
            placeholder="auto"
            maxLength={4}
            value={removeUnit(styleData['top'])}
            onChange={(event) => onInputChange('top', event.target.value)}
            onKeyDown={(e) => onInputKeyDown(e.key, 'top')}
          />
        </div>
        <div className="right-div">
          <Input
            className="next-noborder"
            placeholder="auto"
            maxLength={4}
            value={removeUnit(styleData['right'])}
            onChange={(event) => onInputChange('right', event.target.value)}
            onKeyDown={(e) => onInputKeyDown(e.key, 'right')}
          />
        </div>
        <div className="bottom-div">
          <Input
            className="next-noborder"
            placeholder="auto"
            maxLength={4}
            value={removeUnit(styleData['bottom'])}
            onChange={(event) => onInputChange('bottom', event.target.value)}
            onKeyDown={(e) => onInputKeyDown(e.key, 'bottom')}
          />
        </div>
        <div className="left-div">
          <Input
            className="next-noborder"
            placeholder="auto"
            maxLength={4}
            value={removeUnit(styleData['left'])}
            onChange={(event) => onInputChange('left', event.target.value)}
            onKeyDown={(e) => onInputKeyDown(e.key, 'left')}
          />
        </div>
      </div>
    </div>
  );
};
