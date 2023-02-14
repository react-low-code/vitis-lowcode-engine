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
import app from './src/app.jsx'
import global from './src/global.css'
import typings from './src/typings.d.ts'
import router from './src/routes.ts'

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

    return root
}