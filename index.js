const visit = require('unist-util-visit');
const { Transformer } = require('markmap-lib');

const transformer = new Transformer();

const RE_RENDER_AS_MARKMAP = /<!--\s*render-as-markmap\s*-->/;
let id = 0;

function encodeAttr(str) {
  const encoded = str.replace(/[<>&"]/g, m => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
  }[m]));
  return encoded;
}

function createMarkmap(content) {
  const { root } = transformer.transform(content);
  const elId = `markmap-${++id}`;
  return `<div id="${elId}" class="gatsby-markmap" data-markmap="${encodeAttr(JSON.stringify(root))}"></div>`;
}

module.exports = ({ markdownAST }, pluginOptions) => {
  visit(markdownAST, 'code', node => {
    let content;
    if (node.lang === 'markmap') {
      content = node.value;
    } else if (node.lang === 'markdown') {
      const lines = node.value.split('\n');
      if (!RE_RENDER_AS_MARKMAP.test(lines.shift())) return;
      content = lines.join('\n');
    } else {
      return;
    }
    node.type = 'html';
    node.value = createMarkmap(content);
  });
  return markdownAST;
};
