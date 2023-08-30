import * as React from 'react';
import Row from '../../components/row';
import { Collapse, InputNumber, Select } from 'antd';
import { useEffect } from 'react';
import PositionBox from '../position/positionBox';
import { StyleData, onStyleChange } from '../../utils/types';
import positionConfig from './config.json';
const Panel = Collapse.Panel;

interface layoutProps {
  styleData: StyleData | any;
  onStyleChange: onStyleChange;
}

export default (props: layoutProps) => {
  const { float, clear, position } = positionConfig;

  const { onStyleChange, styleData } = props;

  const onZIndexChange = (zIndex: number | null) => {
    onStyleChange([{ styleKey: 'zIndex', value: zIndex === null ? undefined: zIndex }]);
  };

  const initData = () => {};

  useEffect(() => {
    initData();
  }, []);

  return (
    <Collapse defaultActiveKey={['0']}>
      <Panel header="位置" key="0">
        <Row title={position.title} styleData={styleData} styleKey="position" onStyleChange={() => {}}>
          <Select
            options={position.dataList}
            value={styleData.position}
            allowClear={true}
            onChange={(val) => onStyleChange([{ styleKey: 'position', value: val }])}
          />
        </Row>

        {styleData['position'] && styleData['position'] != 'static' && (
          <PositionBox {...props} />
        )}

        <Row title={'层叠顺序'} styleData={styleData} styleKey="zIndex" onStyleChange={() => {}}>
          <InputNumber
            step={1}
            precision={2}
            onChange={onZIndexChange}
            value={styleData['zIndex']}
          />
        </Row>

        <Row
          title={float.title}
          dataList={float.dataList}
          onStyleChange={onStyleChange}
          styleData={styleData}
          styleKey="float"
        />
        <Row
          title={clear.title}
          dataList={clear.dataList}
          onStyleChange={onStyleChange}
          styleData={styleData}
          styleKey="clear"
        />
      </Panel>
    </Collapse>
  );
};
