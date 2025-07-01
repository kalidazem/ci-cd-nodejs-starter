// See https://svelte.dev/docs/kit/types#app.d.ts

import type { ApiAgent } from '$lib/server/apiAgent';

// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			apiClient: ApiAgent | null;
		}
	}
}

export {};
