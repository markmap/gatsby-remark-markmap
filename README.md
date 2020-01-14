# gatsby-remark-markmap

Visualize code blocks in Markdown files using [markmap](https://github.com/dundalek/markmap).

## Demo

Input:

````markdown
Render Markdown as mindmap:

```markdown
<!-- render-as-markmap -->

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

Add a comment at the beginning of your Markdown code block:

````markdown
```markdown
<!-- render-as-markmap -->

put your Markdown here
```
````
