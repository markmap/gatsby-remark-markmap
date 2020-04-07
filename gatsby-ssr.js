const React = require('react');

exports.onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  return setHeadComponents([
    React.createElement("script", {
      src: "https://cdn.jsdelivr.net/npm/d3@5"
    }),
  ]);
};
