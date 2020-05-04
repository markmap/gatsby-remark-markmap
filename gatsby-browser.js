const d3 = require('d3');
const { markmap, loadPlugins } = require('markmap-lib/dist/view');

const defaultOptions = {
  plugins: [],
};

let initialize = (options) => {
  initialize = () => {};
  const { plugins } = {
    ...defaultOptions,
    ...options,
  };
  if (plugins?.length) loadPlugins(plugins);
};

exports.onRouteUpdate = (context, pluginOptions) => {
  const markmaps = Array.from(document.querySelectorAll('.gatsby-markmap'));
  if (markmaps.length) initialize(pluginOptions);
  markmaps.forEach(wrapper => {
    const svg = d3.select(wrapper).append('svg');
    try {
      const data = JSON.parse(wrapper.dataset.markmap);
      markmap(svg, data, pluginOptions.markmap);
    } catch (err) {
      console.error(`Error loading markmap ${svg && svg.id}!`);
      console.error(err);
    }
  });
};
