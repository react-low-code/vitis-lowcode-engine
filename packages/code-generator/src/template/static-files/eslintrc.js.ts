import { ResultFile } from '../../types/file'

export default function getFile(): [string[], ResultFile] {
    return [[], {
        name: '.eslintrc',
        ext: 'js',
        content: `const { getESLintConfig } = require('@iceworks/spec');

        // https://www.npmjs.com/package/@iceworks/spec
        module.exports = getESLintConfig('react-ts');`
    }]
}
