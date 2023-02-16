import { ResultDir, ResultFile } from '../types/file'
import { CodeGeneratorError } from './error'

type FuncFileGenerator = () => [string[], ResultFile];

export function createResultDir(name: string): ResultDir {
    return {
      name,
      dirs: [],
      files: [],
    };
}

export function addDirectory(target: ResultDir, dir: ResultDir): void {
    if (target.dirs.findIndex((d) => d.name === dir.name) < 0) {
      target.dirs.push(dir);
    } else {
      throw new CodeGeneratorError(
        `Adding same directory to one directory: ${dir.name} -> ${target.name}`,
      );
    }
  }
  
  export function addFile(target: ResultDir, file: ResultFile): void {
    if (target.files.findIndex((f) => f.name === file.name && f.ext === file.ext) < 0) {
      target.files.push(file);
    } else {
      throw new CodeGeneratorError(
        `Adding same file to one directory: ${file.name} -> ${target.name}`,
      );
    }
  }

export function insertFile(root: ResultDir, path: string[], file: ResultFile) {
  let current: ResultDir = root;
  path.forEach((pathNode) => {
    const dir = current.dirs.find((d) => d.name === pathNode);
    if (dir) {
      current = dir;
    } else {
      const newDir = createResultDir(pathNode);
      addDirectory(current, newDir);
      current = newDir;
    }
  });

  addFile(current, file);
}

export function insertDirectory(root: ResultDir, path: string[]) {
  let current: ResultDir = root;
  path.forEach((pathNode) => {
    const dir = current.dirs.find((d) => d.name === pathNode);
    if (dir) {
      current = dir;
    } else {
      const newDir = createResultDir(pathNode);
      addDirectory(current, newDir);
      current = newDir;
    }
  });

  return current
}

export function runFileGenerator(root: ResultDir, fun: FuncFileGenerator) {
  try {
    const result = fun();
    const [path, file] = result;
    insertFile(root, path, file);
  } catch (error) {
    throw new Error(`Error: ${typeof fun}`);
  }
}