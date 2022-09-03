const visit = require('unist-util-visit');
const { escapeScript } = require('markmap-common');
const { Transformer } = require('markmap-lib');

const transformer = new Transformer();

const getId = (
  (id) => () =>
    ++id
)(0);

function createMarkmap(content) {
  const { root, frontmatter } = transformer.transform(content);
  return [
    `<div id="markmap-${getId()}" class="gatsby-markmap">`,
    '<script type="text/markmap">',
    escapeScript(JSON.stringify({ data: root, options: frontmatter?.markmap })),
    '</script>',
    '</div>',
  ].join('');
}

module.exports = ({ markdownAST }, pluginOptions) => {
  visit(markdownAST, 'code', (node) => {
    if (node.lang === 'markmap' || node.lang === 'markdown' && node.meta === 'markmap') {
      node.type = 'html';
      node.value = createMarkmap(node.value);
    }
  });
  return markdownAST;
};
