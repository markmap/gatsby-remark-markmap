const { markmap } = require('markmap-lib/dist/view.common');

exports.onRouteUpdate = (context, pluginOptions) => {
  const markmaps = Array.from(document.querySelectorAll('.gatsby-markmap'));
  markmaps.forEach(wrapper => {
    const svg = wrapper.querySelector('svg');
    try {
      const data = JSON.parse(wrapper.dataset.markmap);
      markmap(svg, data, pluginOptions.markmap);
    } catch (err) {
      console.error(`Error loading markmap ${svg && svg.id}!`);
      console.error(err);
    }
  });
};
