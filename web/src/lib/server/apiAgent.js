import axios from 'axios';
// import setCookieParser from 'set-cookie-parser';

/**
 * @typedef {import('@sveltejs/kit').Cookies} Cookies
 */

export class ApiAgent {
	/**
	 *
	 * @param {Cookies} cookies
	 */
	constructor(cookies) {
		this.cookies = cookies;

		const accessToken = cookies.get('access_token');
		const refreshToken = cookies.get('refresh_token');

		// Use this if you want to make use of cookies
		// this.axios = axios.create({
		// 	baseURL: PRIVATE_API_BASE,
		// 	headers: {
		// 		Cookie: cookieHeader
		// 	}
		// });

		this.axios = axios.create({
			baseURL: 'http://app:3000'
		});
	}

	/**
	 * @param {import('axios').AxiosRequestConfig} config
	 * @returns {Promise<import('axios').AxiosResponse>}
	 */
	async request(config) {
		const response = await this.axios.request(config);
		this.syncApiCookiesToBrowser(response);
		return response;
	}

	/**
	 * @param {string} url
	 * @param {import('axios').AxiosRequestConfig} config
	 */
	async get(url, config = {}) {
		return this.request({ ...config, method: 'get', url });
	}

	/**
	 * @param {string} url
	 * @param {*} data
	 * @param {import('axios').AxiosRequestConfig} config
	 */
	async post(url, data = {}, config = {}) {
		return this.request({ ...config, method: 'post', url, data });
	}

	/**
	 * @param {string} url
	 * @param {*} data
	 * @param {import('axios').AxiosRequestConfig} config
	 */
	async put(url, data = {}, config = {}) {
		return this.request({ ...config, method: 'put', url, data });
	}

	/**
	 * @param {string} url
	 * @param {import('axios').AxiosRequestConfig} config
	 */
	async delete(url, config = {}) {
		return this.request({ ...config, method: 'delete', url });
	}

	/**
	 * @param {import('axios').AxiosResponse} response
	 */
	async syncApiCookiesToBrowser(response) {
		const rawSetCookies = response.headers['set-cookie'];
		if (!rawSetCookies) return;

		// uncomment to use cookie parser
		// const parsed = setCookieParser.parse(rawSetCookies, { map: true });

		// for (const name of [
		// 	'access_token',
		// 	'refresh_token',
		// 	'device_id',
		// 	'email_verification',
		// 	'device_verification',
		// 	'device_verified',
		// 	'session_verified'
		// ]) {
		// 	const cookie = parsed[name];
		// 	if (!cookie) continue;

		// 	this.cookies.set(name, cookie.value, {
		// 		httpOnly: cookie.httpOnly,
		// 		secure: cookie.secure,
		// 		sameSite: cookie.sameSite ?? 'Lax',
		// 		path: cookie.path ?? '/',
		// 		maxAge: cookie.maxAge,
		// 		domain: cookie.domain
		// 	});
		// }
	}
}
