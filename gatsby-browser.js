import debounce from 'lodash.debounce';
import { loadCSS, loadJS } from 'markmap-common';
import './style.css';

const assets = loadMeta('assets');
let loading;
let loaded = [];

window.addEventListener('resize', debounce(() => {
  if (!window.markmap) return;
  loaded.forEach(mm => {
    mm.fit();
  });
}, 200));

function loadMeta(key) {
  let data;
  const meta = document.querySelector(`meta[name="markmap:${key}"]`);
  if (meta) {
    try {
      data = JSON.parse(meta.content);
    } catch {
      // noop
    }
  }
  return data;
}

function autoload() {
  if (!loading) {
    const styles = [...assets?.styles || []];
    const scripts = [
      {
        type: 'script',
        data: {
          src: 'https://cdn.jsdelivr.net/combine/npm/d3@6,npm/markmap-view@0.2',
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
          const mm = markmap.Markmap.create(svg, pluginOptions.markmap, data);
          loaded.push(mm);
        } catch (err) {
          console.error(err);
        }
      });
    });
  }
}
