// gatsby-preset-babel enables loose mode by default,
// d3 does not work in loose mode, so we have to external it
// and load it from CDN.
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    externals: {
      d3: 'd3',
    },
  });
};
