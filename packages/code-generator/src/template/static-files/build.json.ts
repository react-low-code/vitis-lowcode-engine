import { ResultFile } from '../../types/file'

export default function getFile(): [string[], ResultFile] {
    return [[], {
        name: 'build',
        ext: 'json',
        content: `{
            "vite": true,
            "plugins": [
              [
                "build-plugin-ignore-style",
                {
                  "libraryName": "antd"
                }
              ]
            ],
            "store": false
          }
          `
    }]
}
