# Folder Structure for `content/guide/` 

All files here get generated for `/guide` articles _and_ the questions & radio inputs forms.

**Example Question**

What is your Tenancy Model?

**Example Factors** e.g. possible answers

- Single-tenant Cluster
- Multi-tenant Cluster

### YAML Front Matter - no nested attributes ⚠️

The Nuxt content plugin only renders 1 level of YAML attributes.

For example, this works

```yaml
title: Active/Passive Setup
description: I need redudant on stand-by infrastructure in production.
complexity:  15
security: 0
cost: 10
operations: 20
```

But this **does not work**

```yaml
title: Active/Passive Setup
description: I need redudant on stand-by infrastructure in production.
scores: 
	complexity:  15 # does NOT work
	security: 0
	cost: 10
	operations: 20
```

## Categories

- `guide` prefix is defined in in `schemas/config.js`
- Sort Order is determined by `categoriesSorted` property in `schemas/config.js`
- Currently there is no `index.md` for each category (📥 TODO) 

```
content/guide/${category}
```

## Questions

Must be individual markdown files in folder because we cannot use `{ deep: true }` on `$content.fetch()` which would otherwise return factors content as well.

```
content/guide/category/${question-1.md}
content/guide/category/${question-2.md}
```

## Factors 

Factors are put in a subdirectory `guide/category/factors/` inside the category to avoid being fetched.

And then in a **subdirectory** that matches slug of question, e.g.

e.g. for a question which is also `<input>`

```
content/guide/category/${question-1.md}
```

the radio buttons and subcontent are found in a nested `factors/${question}/` subdirectory, e.g.


```
content/guide/category/factors/${question-1}/${input-A.md}
content/guide/category/factors/${question-1}/${input-B.md}
content/guide/category/factors/${question-2}/
content/guide/category/factors/${question-2}/${input-C.md}
content/guide/category/factors/${question-2}/${input-D.md}
```