import { run } from '../src/cli/index'
import { resolve } from 'path'

run({
    input: 'example-schema.json',
    output: resolve(process.cwd(),'../../demo')
})