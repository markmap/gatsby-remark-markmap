const visit = require('unist-util-visit');
const { transform } = require('markmap-lib/dist/transform.common');

const RE_RENDER_AS_MARKMAP = /<!--\s*render-as-markmap\s*-->/;

module.exports = ({ markdownAST }, pluginOptions) => {
  let id = 0;
  visit(markdownAST, 'code', node => {
    if (node.lang !== 'markdown') return;
    const lines = node.value.split('\n');
    if (!RE_RENDER_AS_MARKMAP.test(lines.shift())) return;
    const content = lines.join('\n');
    const data = transform(content);
    const elId = `markmap-${++id}`;
    node.type = 'html';
    node.value = `<div id="${elId}" class="gatsby-markmap" data-markmap="${encodeAttr(JSON.stringify(data))}"><svg></svg></div>`;
  });
  return markdownAST;
};

function encodeAttr(str) {
  const encoded = str.replace(/[<>&"]/g, m => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
  }[m]));
  return encoded;
}
