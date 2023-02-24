/* eslint-disable no-console */
import chalk from 'chalk';
import * as fs from 'fs-extra';
import JSON5 from 'json5';
import { jsonc } from 'jsonc';
import { resolve } from 'path'

import { generateProject } from '../index';
import type { ProjectSchema } from 'vitis-lowcode-types';

/**
 * 执行出码 CLI 命令
 * @param args 入参数组
 * @param options 选项
 * @returns {Promise<number>} 错误码
 */
export async function run(
  options: {
    input?: string;
    output?: string;
    quiet?: boolean;
    verbose?: boolean;
  },
): Promise<number> {
  try {
    const schemaFile = options.input
    if (!schemaFile) {
      throw new Error(
        'a schema file must be specified by `--input <schema.json>` or by the first positional argument',
      );
    }

    // 读取 Schema
    const schema = await loadSchemaFile(schemaFile);

    // 生成代码
    const builder = await generateProject(schema);

    builder.writeToDisk(options.output || resolve(process.cwd(), '../../hello'))


    // 输出到磁盘
    // const publisher = CodeGenerator.publishers.disk();

    // await publisher.publish({
    //   project: generatedSourceCodes,
    //   outputPath: options.output || 'generated',
    //   projectSlug: 'example',
    //   createProjectFolder: false,
    // });
    return 0;
  } catch (e) {
    if (typeof e === 'object' && (e as { stack: string } | null)?.stack && options.verbose) {
      console.log(chalk.gray((e as { stack: string }).stack));
    }
    return 1;
  }
}

async function loadSchemaFile(schemaFile: string): Promise<ProjectSchema> {
  if (!schemaFile) {
    throw new Error('invalid schema file name');
  }

  const schemaFileContent = await fs.readFile(schemaFile, 'utf8');

  if (/\.json5/.test(schemaFile)) {
    return JSON5.parse(schemaFileContent);
  }

  // 默认用 JSONC 的格式解析（兼容 JSON）
  return jsonc.parse(schemaFileContent);
}
