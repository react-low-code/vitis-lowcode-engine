import build from './build.json'
import editorconfig from './editorconfig'
import eslintignore from './eslintignore'
import eslintrc from './eslintrc.js'
import gitignore from './gitignore'
import prettierignore from './prettierignore'
import prettierrc from './prettierrc.js'
import stylelintignore from './stylelintignore'
import stylelintrc from './stylelintrc.js'
import tsconfig from './tsconfig.json'
import app from './src/app.tsx'
import global from './src/global.css'
import typings from './src/typings.d.ts'
import router from './src/routes.ts'
import types from './src/types.ts'
import context from './src/context.ts'
import useDataSource from './src/hooks/useDataSource.ts'
import useDisabled from './src/hooks/useDisabled.ts'
import useGetInitVal from './src/hooks/useGetInitVal.ts'
import useHidden from './src/hooks/useHidden.ts'
import usePrevVal from './src/hooks/usePrevVal.ts'
import useSetFormControlVal from './src/hooks/useSetFormControlVal.ts'
import useSetFormErrors from './src/hooks/useSetFormErrors.ts'

import {ResultDir} from '../../types/file'
import { createResultDir, runFileGenerator } from '../../utils/templateHelper'

export function generateStaticFiles(root = createResultDir('.')): ResultDir {
    runFileGenerator(root, tsconfig)
    runFileGenerator(root, stylelintignore)
    runFileGenerator(root, stylelintrc)
    runFileGenerator(root, prettierignore)
    runFileGenerator(root, prettierrc)
    runFileGenerator(root, gitignore)
    runFileGenerator(root, eslintrc)
    runFileGenerator(root, eslintignore)
    runFileGenerator(root, editorconfig)
    runFileGenerator(root, build)
    runFileGenerator(root, app)
    runFileGenerator(root, global)
    runFileGenerator(root, typings)
    runFileGenerator(root, router)
    runFileGenerator(root, types)
    runFileGenerator(root, context)
    runFileGenerator(root, useDataSource)
    runFileGenerator(root, useDisabled)
    runFileGenerator(root, useGetInitVal)
    runFileGenerator(root, useHidden)
    runFileGenerator(root, usePrevVal)
    runFileGenerator(root, useSetFormControlVal)
    runFileGenerator(root, useSetFormErrors)

    return root
}