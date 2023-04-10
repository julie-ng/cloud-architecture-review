# Git Graphs with Mermaid.js

Created using Diagramming and charting tool [Mermaid.js](https://mermaid.js.org/syntax/gitgraph.html). To export an SVG just run

```bash
mmdc -i dark -i mermaid.mmd -o export.svg
```

Note: I did the custom styling largely with copy and paste css.

## Custom Theme

Used in my files

### Colors

| Color | Hex Value |
|:--|:--|
| Red | `#ff4930` |
| Yellow | `#f6c65b` |
| Blue | `#02ccd5` |

See full theme variables list at [theme-dark.js](https://github.com/mermaid-js/mermaid/blob/develop/packages/mermaid/src/themes/theme-dark.js) on GitHub.com


### Manual Changes

After exporting, there's a few changes that still need to be done manually - because I'm also a designer 🤓

First change default font family and size

```
#mermaid-1681115922768 {
	font-family: "Consolas", verdana, arial, sans-serif;
	font-size: 14px;
	fill: #333;
}
```

Branch label color to `#111111` for both `0` and `1`

```
#mermaid-1681116172220 .branch-label1 {
	fill: #111111;
}
```

Stroke for `.branch`

```
#mermaid-1681109347892 .branch {
	stroke-width: 1;
	stroke: #cccccc;
	stroke-dasharray: 2;
}
```

Then change this to white for `.commit-merge` and `.commit-reverse`

```
#mermaid-1681115132893 .commit-merge {
	stroke: #fff4dd;
	fill: #fff4dd;
}

#mermaid-1681115132893 .commit-reverse {
	stroke: #fff4dd;
	fill: #fff4dd;
	stroke-width: 3;
}
```

But highlight color to `#e3fcff` light blue for `.commit-highlight-inner `


```
#mermaid-1681115132893 .commit-highlight-inner {
	stroke: #e3fcff;
	fill: #e3fcff;
}
```

Change Opacity for `.commit-label-bkg`

```
#mermaid-1681115132893 .commit-label-bkg {
	font-size: 11px;
	fill: #ffffff;
	opacity: 0.8;
}
```

Fill tag hole

```
#mermaid-1681118112591 .tag-hole {
	fill: #ffffff;
}
```