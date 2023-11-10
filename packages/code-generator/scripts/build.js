const esbuild = require('esbuild');
const packageJson = require('../package.json');

function buildFormat(format, outDir) {
    try {
      console.log('building %s...', format);
      const startTime = Date.now();
      const result = esbuild.buildSync({
        entryPoints: ['src/index.ts'],
        outfile: `${outDir}/index.js`,
        bundle: true,
        platform: 'node',
        target: ['node10'],
        format,
        sourcemap: true,
        sourcesContent: true,
        define: {},
        treeShaking: true,
        external: Object.keys(packageJson.dependencies),
        minify: false,
        legalComments: 'external',
      });
      if (result.errors.length > 0) {
        throw result.errors;
      }
  
      if (result.warnings.length > 0) {
        result.warnings.forEach((warnings) => {
          console.warn(warnings);
        });
      }
  
      console.log('built %s in %ds', format, ((Date.now() - startTime) / 1000).toFixed(2));
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }

  buildFormat('cjs','lib')