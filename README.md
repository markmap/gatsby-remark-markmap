# gatsby-remark-markmap

Visualize code blocks in Markdown files using [markmap](https://github.com/gera2ld/markmap).

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

- `options.markmap`, default as `{}`

  Passed to [markmap-view](https://github.com/gera2ld/markmap/tree/master/packages/markmap-view).

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

Code blocks with a language of `markmap` will be transformed into interactive markmaps. You can also prepend a comment to leverage Markdown syntax highlight:

````markdown
```markdown
<!-- render-as-markmap -->

# markmap
## contents
```
````

## Related

- [markmap](https://github.com/gera2ld/markmap) - markmap core packages
