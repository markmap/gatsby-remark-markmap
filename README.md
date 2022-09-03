# gatsby-remark-markmap

Visualize code blocks in Markdown files using [markmap](https://github.com/gera2ld/markmap).

## Demo

Input:

````markdown
Render Markdown as mindmap:

```markdown markmap
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

```bash
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

- `options.markmap` *object*

  JSON options for markmap rendering, see [the documentation](https://markmap.js.org/docs/json-options) for more details.

- `options.assets` *(assets: IAssets) => IAssets*

  Change the assets to preload for markmap. If provided, the returned assets will be preloaded.

Here is an example using options:

```js
{
  resolve: 'gatsby-remark-markmap',
  options: {
    markmap: {/* markmap options */},
  },
},
```

### Code

Code blocks with language of `markdown` and meta of `markmap` will be transformed into interactive markmaps.

````markdown
```markdown markmap
# markmap
## contents
```
````

## Related

- [markmap](https://github.com/gera2ld/markmap) - markmap core packages
