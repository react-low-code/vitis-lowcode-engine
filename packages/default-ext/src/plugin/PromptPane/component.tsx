import { Popover, Input, Button } from 'antd';
import React, { useState,useLayoutEffect, useEffect } from "react"
import { OpenAIOutlined } from '@ant-design/icons';

const BASE_URL = 'http://127.0.0.1:3001'

export default function PromptPane() {
  const [active, setActive] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);
  const [keyword,setKeyword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false);

  useLayoutEffect(() => {
    setHeight(document.body.clientHeight - 130)
  },[])

  const onOpenChange = () => {
    setActive(!active)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const onOK = () => {
    if (!keyword) {
      return ;
    }
    setLoading(true);
    fetch(BASE_URL+'/prompt/generate/schema', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: keyword
      })
    })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error('网络请求失败: ' + response.status);
      }
      const res: {
        data: any;
        code: string;
        msg: string;
      } = await response.json()
      console.log(window.VitisLowCodeEngine.project,'window.VitisLowCodeEngine.project')
      if (window.VitisLowCodeEngine.project) {
        window.VitisLowCodeEngine.project.insertSchema(res.data);
      }
    })
    .finally(() => {
      setLoading(false);
    })
  }

  return (
     <Popover 
        trigger="click"
        placement="rightTop"
        content={
            <div className="pane-body" style={{height: height + 'px'}}>
              <Input value={keyword} onChange={onChange} placeholder='帮我添加一个输入姓名的输入框和一个性别选择下拉框，选项为男、女' disabled={loading} />
              <Button onClick={onOK} type="primary" loading={loading}>确定</Button>
            </div>
        }
        onOpenChange={onOpenChange}
        open={active}
    >
      <OpenAIOutlined style={{fontSize: '22px'}}/>
    </Popover>
  )
}
