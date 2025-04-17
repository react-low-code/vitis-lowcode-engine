import { BASE_URL } from './config';

export async function fetchSchema () {
  return fetch(BASE_URL+'/prompt/generate/schema', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      // 在这里添加你要发送的请求数据
      prompt: '生成一个包含用户名和密码的表单'
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
  
    return res.data;
  })
}