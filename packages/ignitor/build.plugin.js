const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const fse = require('fs-extra');

module.exports = ({ context, onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
    config.resolve.plugin('tsconfigpaths').use(TsconfigPathsPlugin, [
      {
        configFile: './tsconfig.json',
      },
    ]);
    config.plugins.delete('hot');
    config.devServer.hot(false);
    config.module.rule('svg').uses.clear().end().use('svg').loader('@svgr/webpack').end();
    if (context.command === 'start') {
      config.devtool('inline-source-map');
    }
  });
};
