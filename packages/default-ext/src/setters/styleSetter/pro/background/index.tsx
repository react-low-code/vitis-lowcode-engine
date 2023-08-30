import * as React from 'react';
import { useState, useEffect } from 'react';
import Row from '../../components/row';
import Icon from '../../components/icon';
import ColorInput from '../../components/color-input';
import { StyleData, onStyleChange } from '../../utils/types';
import { Collapse, Input } from 'antd';
import borderConfig from './config.json';
// import "./index.scss";
const Panel = Collapse.Panel;

interface fontProps {
  styleData: StyleData | any;
  onStyleChange: onStyleChange;
  unit?: string;
}
export default (props: fontProps) => {
  const { onStyleChange, styleData } = props;
  const { backgroundType } = borderConfig;
  const [bgType, setBgType] = useState<string>();

  const onBgTypeChange = (styleDataList: Array<StyleData>) => {
    if (styleDataList) {
      setBgType(styleDataList[0].value as string);
    }
  };

  const formatBgImgUrl = (url: string) => {
    if (url && url != '') {
      return 'url(' + url + ')';
    } else {
      return undefined;
    }
  };

  const backToBgImgUrl = (styleUrl: string) => {
    if (styleUrl) {
      // const reg = /^url\(.*\)/;
      // var result = styleUrl.match(reg);
      let newUrl = styleUrl.substring(styleUrl.indexOf('(') + 1, styleUrl.indexOf(')'));

      return newUrl;
      // return styleUrl.substring(
      //   styleUrl.indexOf("(") + 1,
      //   styleUrl.indexOf(")") - 1
      // );
    } else {
      return '';
    }
  };

  const initData = () => {
    if (styleData.backgroundColor) {
      setBgType('backgroundColor');
    } else if (styleData.backgroundImage) {
      setBgType('backgroundImage');
    }
  };

  useEffect(() => {
    initData();
  }, []);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onStyleChange([
      {
        styleKey: 'backgroundImage',
        value: formatBgImgUrl(event.target.value),
      },
    ]);
  };

  return (
    <Collapse defaultActiveKey={['0']}>
      <Panel header="背景" className="font-style-container" key='0'>
        <Row
          title={backgroundType.title}
          dataList={backgroundType.dataList}
          styleKey=""
          {...props}
          onStyleChange={onBgTypeChange}
          value={bgType}
        ></Row>

        {bgType == 'color' && (
          <Row title={' '} styleKey="" {...props}>
            <ColorInput styleKey={'backgroundColor'} {...props} inputWidth="100%"></ColorInput>
          </Row>
        )}

        {bgType == 'bgImg' && (
          <Row title={' '} styleKey="" {...props}>
            <Input
              addonBefore={<Icon type="icon-suffix-url" style={{ margin: 4 }} />}
              placeholder="输入图片url"
              style={{ width: '100%' }}
              value={backToBgImgUrl(styleData['backgroundImage'])}
              onChange={onInputChange}
            />
          </Row>
        )}
      </Panel>
    </Collapse>
  );
};
