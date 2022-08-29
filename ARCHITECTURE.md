# Application Architecture

## Form Components

Input Radios

- input `name` is always `${category.slug}-${question.slug}`
- input `value` is always `${question.slug}-${factor.slug}`

```html
<input type="radio" name="requirements-dr" id="dr-redeploy" value="dr-redeploy"> 
```

### Form Component `<review-form>`

Requires

- `categories` which comes from `$store`
  
Each `category` has
- `title` String
- `questions` Array
  - `slug` String

```html
<template>
	<div>
		<section v-for="c of categories" :key=c.name>			
			<h1 class="category-title">{{ c.name }}</h1>
			<review-question
				v-for="q of c.questions"
				:key=q.slug
				:question=normalizeQuestion(q)
			>
			</review-question>
		</section>
	</div>
</template>
```

### Question Field `<review-question>`

#### Required Parameters

- `question` Object  
  expects normalized per `QuestionSchema` ❗️
  - `title` String   
  	which links to full guide page
  - `description` String
  - `factors` Array
    - `slug`

#### Template

```html
<template>
	<article class="question-box box">
		<h2 class="question-title has-scroll-anchor" :id=question.slug>
			<NuxtLink :to=question.path>{{ question.title }}</NuxtLink>
		</h2>
		<p>{{ question.description }} <NuxtLink :to=question.path>Learn more…</NuxtLink></p>
		<review-radio-input
			v-for="factor of question.factors"
			:name=question.inputName
			:key=factor.slug
			:factor=normalizeFactor(factor)
			@selected="updateDecision($event, $store, question)"
		></review-radio-input>

		<button class="question-reset-btn" @click="removeDecision($store, question)">Reset</button>
	</article>
</template>
```


### Radio Input `<review-radio-input>`

#### Required Parameters

- `factor` Object  
  expects normalized per `FactorSchema` ❗️
- `name` String  
  `name` property of the `<input>` element
- `answer` Object
  - determines `checked` property on `<input type="radio">` by comparing `factor.slug === answer`


#### Template

```html
<template>
	<article v-bind:class="elClass">
		<label :for=factor.slug class="form-control label-factor">
			<input ref="input" type="radio"
				:name=name
				:id=factor.inputValue
				:key=factor.inputValue
				:value=factor.inputValue
				v-model=answer
			>
			<h4>{{ factor.title }}</h4>
			<p>{{ factor.description }}</p>
		</label>
	</article>
</template>
```

#### Example Usage

```html
<review-radio-input
	v-for="factor of question.factors"
	:name=question.inputName
	:key=factor.slug
	:factor=normalizeFactor(factor)
	@selected="updateDecision($event, $store, question)"
></review-radio-input>
```

#### Example Result

```html
<article class="factor-container is-selected">
	<label for="dr-redeploy" class="form-control label-factor">
		<input type="radio" name="requirements-dr" id="dr-redeploy" value="dr-redeploy"> 
		<h4>I will redeploy</h4>
		<p>I will re-deploy to another region.</p>
	</label>
</article>
```