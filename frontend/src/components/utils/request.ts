// interface requestProps {
// url: string,
// method: string,
// data:
// }

export const request = (path, method, data) => {
	const apiUrl = 'http://localhost:3005';
	const url = new URL(path, apiUrl);
	return fetch(url.href, {
		headers: {
			'content-type': 'application/json',
		},
		method: method || 'GET',
		body: data ? JSON.stringify(data) : undefined,
		credentials: 'include',
	}).then((res) => res.json());
};
