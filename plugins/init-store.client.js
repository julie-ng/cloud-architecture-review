/**
 * Loads form data and previous state from browser's
 * session storage
 */
export default async (context) => {
	// Loads from storage (cached) or creates from $content
	await context.store.dispatch('form/clientInit', context)

	// Loads existing form selections, i.e. decisions
	await context.store.dispatch('decisions/clientInit', context)
}
