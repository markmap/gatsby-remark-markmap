# gatsby-remark-markmap

Visualize code blocks in Markdown files using [markmap-lib](https://github.com/gera2ld/markmap-lib).

## Demo

Input:

````markdown
Render Markdown as mindmap:

```markmap
# Food
## Fruits
- easy to eat
  - apple
  - banana
- not so easy
  - grapes
## Vegetables
- cabbage
- tomato
```
````

Output:

<img alt="markmap" src="https://user-images.githubusercontent.com/3139113/72319163-6d6ec300-36d9-11ea-99f0-395cb655cb00.png" width="400">

## Installation

```sh
$ yarn add gatsby-remark-markmap
```

## Usage

In your `gatsby-config.js`:

```js
plugins: [
  {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: [
        // Note that `gatsby-remark-markmap` must be put before other plugins
        // that handle code blocks, e.g. `gatsby-remark-prismjs`
        'gatsby-remark-markmap',
        'gatsby-remark-prismjs',
      ],
    },
  },
]
```

### Options

- `options.loadDeps`

  A function to load dependencies before creating markmaps. By default it loads `d3@5` from [jsdelivr.com](https://www.jsdelivr.com/).

- `options.markmap`, default as `{}`

  Passed to [markmap-lib](https://github.com/gera2ld/markmap-lib).

- `options.plugins`, default as `[]`

  An array of extension features to be enabled for markmap. Current available plugins are:

  - `mathJax`: transform MathJax syntax
  - `prism`: highlight code blocks with PrismJS

Here is an example using options:

```js
{
  resolve: 'gatsby-remark-markmap',
  options: {
    markmap: {/* markmap options */},
    plugins: ['mathJax', 'prism'],
  },
},
```

### Code

Code blocks with a language of `markmap` will be transformed into interactive markmaps. You can also prepend a comment to leverage Markdown syntax highlight:

````markdown
```markdown
<!-- render-as-markmap -->

# markmap
## contents
```
````

## Related

- [coc-markmap](https://github.com/gera2ld/coc-markmap) - Vim / NeoVim plugin powered by [coc.nvim](https://github.com/neoclide/coc.nvim)
- [markmap-lib](https://github.com/gera2ld/markmap-lib) - Standalone command line version
