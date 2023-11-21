export function mapHistory(history) {
	return {
		id: history.id,
		name: history.name,
		author: {
			id: history.author.id,
			name: history.author.name,
			surname: history.author.surname,
		},
		authorTest: history.authorTest,
		result: history.result,
		createdAt: history.createdAt,
	};
}
