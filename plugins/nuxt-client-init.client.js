export default async (context) => {
  await context.store.dispatch('form/clientInit', context)
  await context.store.dispatch('decisions/clientInit', context)
}
