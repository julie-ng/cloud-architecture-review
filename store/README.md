# Vuex Store

## Notes

State needs to constantly re-assigned for re-activity to work. See [source](https://vuex.vuejs.org/guide/mutations.html#mutations-follow-vue-s-reactivity-rules)

Example

```
const copy = {...state.decisions}
delete copy[`${cat}-${q.slug}`]
state.decisions = copy // re-assign for re-activity
```