import { ResultFile } from '../../types/file'

export default function getFile(): [string[], ResultFile] {
    return [[], {
        name: '.stylelintrc.js',
        ext: 'js',
        content: `const { getStylelintConfig } = require('@iceworks/spec');

        module.exports = getStylelintConfig('react');        
        `
    }]
}
