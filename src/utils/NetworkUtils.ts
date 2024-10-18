const baseURL = 'http://localhost:3049';

export default new class Networkutils {
	async execute(form: any, url?: string) {
		const { endpoint, method, headers = {}, body } = form;
		try {
			let requestURL = url ? `${url}/${endpoint}` : `${baseURL}/${endpoint}`;
			const response = await fetch(requestURL, {
				method,
				headers,
				body
			});

			if (response.ok) {
				const result = await response.json(); // Ensure to await for JSON parsing
				return result;
			}
		} catch (err) {
			alert(err);
		}
	}
}