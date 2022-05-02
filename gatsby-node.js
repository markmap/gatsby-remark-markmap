const { Transformer } = require('markmap-lib');
const { escapeScript, buildCode } = require('markmap-common');
const viewVersion = require('markmap-view/package.json').version;

const transformer = new Transformer();
const { scripts, styles } = transformer.getAssets();
const assets = {
  scripts: scripts?.map(item => {
    if (item.type === 'script') return item;
    const { fn, getParams } = item.data;
    const code = escapeScript(buildCode(fn, getParams?.({
      getMarkmap: () => window.markmap,
    }) || []));
    return {
      type: 'script',
      data: {
        textContent: code,
      },
    };
  }),
  styles,
};

exports.onCreateWebpackConfig = async ({ actions, plugins }, pluginOptions) => {
  const mergedAssets = (pluginOptions?.assets || (i => i))(assets);
  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        'process.env.MARKMAP_ASSETS': JSON.stringify(mergedAssets),
        'process.env.MARKMAP_VIEW_VERSION': JSON.stringify(viewVersion),
      }),
    ],
  })
};
