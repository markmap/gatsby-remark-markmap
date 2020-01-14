const React = require('react');

exports.onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  return setHeadComponents([
    React.createElement("link", {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/markmap@0.6.1/style/view.mindmap.css"
    }),
    React.createElement("script", {
      src: "https://cdn.jsdelivr.net/npm/d3@3"
    }),
    React.createElement("script", {
      src: "https://cdn.jsdelivr.net/npm/markmap@0.6.1/lib/d3-flextree.js"
    }),
    React.createElement("script", {
      src: "https://cdn.jsdelivr.net/npm/markmap@0.6.1/lib/view.mindmap.js"
    }),
  ]);
};
