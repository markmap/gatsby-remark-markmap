function loadScript(url) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = url;
    s.onload = resolve;
    s.onerror = reject;
    document.body.appendChild(s);
  });
}

const defaultOptions = {
  loadDeps() {
    return loadScript('https://cdn.jsdelivr.net/npm/d3@5');
  },
  plugins: [],
  markmap: {},
};

let loading;

function initialize(options) {
  if (!loading) {
    loading = (async () => {
      options = {
        ...defaultOptions,
        ...options,
      };
      const { loadDeps, plugins } = options;
      if (typeof loadDeps === 'function') {
        await loadDeps();
      }
      const { markmap, loadPlugins } = require('markmap-lib/dist/view');
      if (plugins?.length) loadPlugins(plugins);
      return { markmap, options };
    })();
  }
  return loading;
}

exports.onRouteUpdate = (context, pluginOptions) => {
  const markmaps = Array.from(document.querySelectorAll('.gatsby-markmap'));
  if (markmaps.length) {
    initialize(pluginOptions)
      .then(({ markmap, options }) => {
        markmaps.forEach(wrapper => {
          const svg = d3.select(wrapper).append('svg');
          try {
            const data = JSON.parse(wrapper.dataset.markmap);
            markmap(svg, data, options.markmap);
          } catch (err) {
            console.error(`Error loading markmap ${svg && svg.id}!`);
            console.error(err);
          }
        });
      });
  }
};
