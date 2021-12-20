const visit = require('unist-util-visit');
const { Transformer } = require('markmap-lib');

const transformer = new Transformer();

const getId = (id => () => ++id)(0);

function base64encode(str) {
  return Buffer.from(str).toString('base64');
}

function createMarkmap(content) {
  const { root } = transformer.transform(content);
  return `<div id="markmap-${getId()}" class="gatsby-markmap" data-markmap="${base64encode(JSON.stringify(root))}"></div>`;
}

module.exports = ({ markdownAST }, pluginOptions) => {
  visit(markdownAST, 'code', node => {
    if (node.lang === 'markmap' || node.lang === 'markdown' && node.meta === 'markmap') {
      node.type = 'html';
      node.value = createMarkmap(node.value);
    } else {
      return;
    }
  });
  return markdownAST;
};
