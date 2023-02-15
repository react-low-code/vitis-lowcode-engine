/**
 * 导出内容，对文件的描述
 */
 export interface ResultFile {
    /**
     * 文件名
     * @memberof ResultFile
     */
    name: string;
    /**
     * 文件类型扩展名，例如 .js .less
     */
    ext: string;
    /**
     * 文件内容
     */
    content: string;
  }

  /**
 * 导出内容结构，文件夹
 */
export interface ResultDir {
    /**
     * 文件夹名称，Root 名称默认为 .
     */
    name: string;
    /**
     * 子目录
     */
    dirs: ResultDir[];
    /**
     * 文件夹内文件
     */
    files: ResultFile[];
}

export enum FileType {
  CSS = 'css',
  SCSS = 'scss',
  LESS = 'less',
  HTML = 'html',
  JS = 'js',
  JSX = 'jsx',
  TS = 'ts',
  TSX = 'tsx',
  JSON = 'json',
}

export enum ChunkType {
  AST = 'ast',
  STRING = 'string',
  JSON = 'json',
}