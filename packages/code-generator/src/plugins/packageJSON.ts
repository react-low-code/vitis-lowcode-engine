import { CodeStruct, FileType, ChunkType, ChunkName} from '../types'
import { ProjectSchema } from 'vitis-lowcode-types'

export default function plugin(struct: CodeStruct) {
    const input = struct.input as ProjectSchema
    const componentsMap = input.componentsMap || {}
    const dependencies = Object.keys(componentsMap).map(packageName => {
        return `"${packageName}": "${componentsMap[packageName].version}"`
    }).join(',\n')

    struct.chunks.push({
        chunkType: ChunkType.JSON,
        fileType: FileType.JSON,
        chunkName: ChunkName.FileMainContent,
        content: `{
            "name": "${input.projectName}",
            "version": "1.0.0",
            "description": "${input.description}",
            "engines": {
              "node": ">=14.17.0 <16"
            },
            "scripts": {
                "start": "icejs start --mode local",
                "build": "icejs build --mode prod",
                "lint": "npm run eslint && npm run stylelint",
                "eslint": "eslint --cache --ext .js,.jsx ./",
                "stylelint": "stylelint ./**/*.scss"
            },
            "devDependencies": {
                "@iceworks/spec": "^1.0.1",
                "@types/react": "^17.0.14",
                "@types/react-dom": "^17.0.9",
                "@types/qs": "^6.9.7",
                "build-plugin-antd": "^0.1.2",
                "build-plugin-ignore-style": "^0.1.0",
                "eslint": "^7.30.0",
                "ice.js": "^2.0.0",
                "stylelint": "^13.1.0",
                "@types/axios": "^0.14.0"
            },
            "dependencies": {
                "qs": "^6.11.0",
                "axios": "^1.2.2",
                "antd": "^5.2.1",
                ${dependencies}
            },
        }`,
        linkAfter: [],
    })
    return struct
}