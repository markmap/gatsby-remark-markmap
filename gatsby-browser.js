import debounce from 'lodash.debounce';
import { loadCSS, loadJS } from 'markmap-common';
import './style.css';

const viewVersion = process.env.MARKMAP_VIEW_VERSION;
const assets = process.env.MARKMAP_ASSETS;
let loading;
let loaded = [];

window.addEventListener('resize', debounce(() => {
  if (!window.markmap) return;
  loaded.forEach(mm => {
    mm.fit();
  });
}, 200));

function autoload() {
  if (!loading) {
    const styles = [...assets?.styles || []];
    const scripts = [
      {
        type: 'script',
        data: {
          src: `https://cdn.jsdelivr.net/combine/npm/d3@6,npm/markmap-view@${viewVersion}`,
        },
      },
      ...assets?.scripts || [],
    ];
    loading = Promise.all([
      styles.length && loadCSS(styles),
      scripts.length && loadJS(scripts),
    ]);
  }
  return loading;
}

export function onRouteUpdate(_context, pluginOptions) {
  loaded = loaded.filter(mm => {
    if (!document.body.contains(mm.svg.node())) {
      mm.destroy();
      return false;
    }
    return true;
  });
  const markmaps = Array.from(document.querySelectorAll('.gatsby-markmap'));
  if (markmaps.length) {
    autoload().then(() => {
      const { d3, markmap } = window;
      markmaps.forEach(wrapper => {
        if (wrapper.querySelector('svg')) return;
        const script = wrapper.querySelector('script[type="text/markmap"]');
        if (!script) return;
        try {
          const { data, options } = JSON.parse(script.textContent);
          const svg = d3.select(wrapper).append('svg');
          const mm = markmap.Markmap.create(svg, markmap.deriveOptions({
            ...pluginOptions.markmap,
            ...options,
          }), data);
          loaded.push(mm);
        } catch (err) {
          console.error(err);
        }
      });
    });
  }
}
