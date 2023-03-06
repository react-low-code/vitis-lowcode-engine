import { CodeStruct, FileType, ChunkType, ChunkName, CodeStructInput } from '../types'

export default function plugin(struct: CodeStruct) {
    const input = struct.input

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.HTML,
        chunkName: ChunkName.FileMainContent,
        content: `<!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1" />
            <meta name="viewport" content="width=device-width" />
            <title>${input.title}</title>
          </head>
        
          <body>
            <div id="ice-container"></div>
          </body>
        </html>
        `
    })
    return struct
}