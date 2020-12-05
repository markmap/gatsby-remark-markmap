const React = require('react');
const { Transformer } = require('markmap-lib');
const { escapeScript, buildCode } = require('markmap-common');

const transformer = new Transformer();
const assets = transformer.getAssets();
const { scripts, styles } = assets;
const assetsText = JSON.stringify({
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
});

exports.onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  setHeadComponents([
    React.createElement('meta', {
      name: 'markmap:assets',
      content: assetsText,
    }),
  ]);
};
