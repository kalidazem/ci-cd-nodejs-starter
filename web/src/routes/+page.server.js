import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals }) {
	const response = await locals.apiClient?.get('/todos', { validateStatus: () => true });

	if (response && response.status >= 200 && response.status < 300) {
		return { todos: response?.data, success: true, message: 'recent todos' };
	}
	return { success: false, message: response?.data.message };
}

export const actions = {
	add: async ({ request, locals }) => {
		const data = await request.formData();
		const description = data.get('description');
		const response = await locals.apiClient?.post(
			'/todos',
			{ description },
			{ validateStatus: () => true }
		);

		if (response?.status >= 200 && response?.status < 300) {
			return { success: true, message: response?.data.message, form: 'add' };
		}
		return fail(400, { success: false, message: response.data.message, form: 'add' });
	},
	delete: async ({ request, locals }) => {
		const data = await request.formData();
		const id = data.get('id');
		const response = await locals.apiClient?.delete(`/todos/${id}`, {
			validateStatus: () => true
		});

		if (response?.status >= 200 && response?.status < 300) {
			return { success: true, message: response?.data.message, form: `delete-${id}` };
		}

		console.log(response?.data);
		return fail(400, { success: false, message: response.data.message, form: `delete-${id}` });
	},
	complete: async ({ request, locals }) => {
		const data = await request.formData();
		const id = data.get('id');
		const completed = data.get('completed');

		const response = await locals.apiClient?.put(
			`/todos/${id}`,
			{
				id,
				completed
			},
			{
				validateStatus: () => true
			}
		);

		if (response?.status >= 200 && response?.status < 300) {
			return { success: true, message: response?.data.message, form: `complete-${id}` };
		}

		return fail(400, { success: false, message: response.data.message, form: `complete-${id}` });
	},

	edit: async ({ request, locals }) => {
		const data = await request.formData();
		const id = data.get('id');
		const description = data.get('description');

		const response = await locals.apiClient?.put(
			`/todos/${id}`,
			{
				description
			},
			{
				validateStatus: () => true
			}
		);

		if (response?.status >= 200 && response?.status < 300) {
			return { success: true, message: response?.data.message, form: `edit-${id}` };
		}

		return fail(400, { success: false, message: response.data.message, form: `edit-${id}` });
	}
};
