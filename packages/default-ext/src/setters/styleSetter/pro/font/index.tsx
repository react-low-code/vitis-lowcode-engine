import * as React from 'react';
import Row from '../../components/row';
import Number from '../../components/number';
import { StyleData, onStyleChange } from '../../utils/types';
import { Collapse, InputNumber, Select, Slider } from 'antd';
import ColorInput from '../../components/color-input';
import fontConfig from './config.json';
import { addUnit, isEmptyValue } from '../../utils';
import './index.less';
const Panel = Collapse.Panel;

interface fontProps {
  styleData: StyleData | any;
  onStyleChange: onStyleChange;
  unit?: string;
}
export default (props: fontProps) => {
  const { styleData, onStyleChange } = props;
  const { fontWeight, textAlign } = fontConfig;

  const onNumberChange = (styleKey: string, value?: number, unit?: string) => {
    onStyleChange([
      {
        styleKey,
        value: unit ? addUnit(value, unit) : value,
      },
    ]);
  };

  return (
    <Collapse defaultActiveKey={['0']}>
      <Panel header="文字" className="font-style-container" key="0">
        <div className="inner-row-contaienr">
          <div className="row-item">
            <span className="row-item-title">字号</span>
            <Number
              max={100}
              min={0}
              styleKey="fontSize"
              {...props}
              style={{ marginRight: '10px', width: '100%' }}
              useComputedStyle={true}
            />
          </div>
          <div className="row-item">
            <span className="row-item-title">行高</span>
            <Number
              min={0}
              styleKey="lineHeight"
              {...props}
              style={{ width: '100%' }}
              useComputedStyle={true}
            />
          </div>
        </div>

        <Row title={'字重'} styleData={styleData} styleKey="" onStyleChange={() => {}}>
          <Select
            options={fontWeight.dataList}
            style={{ width: '100%' }}
            value={styleData.fontWeight}
            allowClear={true}
            onChange={(val) => onStyleChange([{ styleKey: 'fontWeight', value: val }])}
          />
        </Row>

        <Row title={'文字颜色'} styleKey="" {...props}>
          <ColorInput styleKey={'color'} {...props} inputWidth="100%"></ColorInput>
        </Row>

        <Row
          title={textAlign.title}
          dataList={textAlign.dataList}
          styleKey="textAlign"
          {...props}
        />

        <Row title={'透明度'} styleKey="opacity" {...props}>
          <div className="opacity-container">
            <Slider
              style={{ marginRight: '7px' }}
              value={!isEmptyValue(styleData.opacity) ? styleData.opacity * 100 : 0}
              onChange={(val) => onNumberChange('opacity', val / 100)}
            />
            <InputNumber
              value={
                !isEmptyValue(styleData.opacity) ? Math.floor(styleData.opacity * 100) : undefined
              }
              max={100}
              min={0}
              onChange={(val) => onNumberChange('opacity', isEmptyValue(val) ? undefined : val as number / 100)}
            />
          </div>
        </Row>
      </Panel>
    </Collapse>
  );
};
