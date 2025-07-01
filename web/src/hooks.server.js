import { ApiAgent } from '$lib/server/apiAgent';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	event.locals.apiClient = new ApiAgent(event.cookies);
	const response = await resolve(event);
	return response;
}
