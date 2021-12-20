import debounce from 'lodash.debounce';
import { loadCSS, loadJS } from 'markmap-common';
import './style.css';

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

function base64decode(base64) {
  const bin = window.atob(base64);
  const len = bin.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i += 1) {
    bytes[i] = bin.charCodeAt(i);
  }
  const decoder = new TextDecoder();
  return decoder.decode(bytes);
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
          const raw = wrapper.dataset.markmap;
          const data = JSON.parse(base64decode(raw));
          const mm = markmap.Markmap.create(svg, pluginOptions.markmap, data);
          loaded.push(mm);
        } catch (err) {
          console.error(err);
        }
      });
    });
  }
}
