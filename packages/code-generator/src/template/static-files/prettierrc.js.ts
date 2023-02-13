import { ResultFile } from '../../types/file'

export default function getFile(): [string[], ResultFile] {
    return [[], {
        name: '.prettierrc',
        ext: 'js',
        content: `const { getPrettierConfig } = require('@iceworks/spec');

        module.exports = getPrettierConfig('react');`
    }]
}
