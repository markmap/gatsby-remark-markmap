import debounce from 'lodash.debounce';
import { loadCSS, loadJS } from 'markmap-common';
import './style.css';

let loading;
const autoload = () => {
  if (!loading) {
    const meta = document.querySelector('meta[name="markmap:assets"]');
    let assets;
    try {
      assets = meta && JSON.parse(meta.content);
    } catch {
      // noop
    }
    meta.remove();
    loading = Promise.all([
      assets?.styles && loadCSS(assets.styles),
      loadJS([
        {
          type: 'script',
          data: {
            src: 'https://cdn.jsdelivr.net/combine/npm/d3@6,npm/markmap-view@0.2',
          },
        },
        ...assets?.scripts || [],
      ]),
    ]);
  }
  return loading;
};

window.addEventListener('resize', debounce(() => {
  if (!window.markmap) return;
  loaded.forEach(mm => {
    mm.fit();
  });
}, 200));

let loaded = [];
export function onRouteUpdate(context, pluginOptions) {
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
        if (wrapper.childNodes.length) return;
        const svg = d3.select(wrapper).append('svg');
        try {
          const data = JSON.parse(wrapper.dataset.markmap);
          const mm = markmap.Markmap.create(svg, null, data);
          loaded.push(mm);
        } catch (err) {
          console.error(err);
        }
      });
    });
  }
}
