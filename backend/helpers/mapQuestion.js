function mapQuestion(qestion) {
	return {
		id: qestion.id,
		author: {
			id: qestion.author.id,
			name: qestion.author.name,
			surname: qestion.author.surname,
		},
		text: qestion.text,
		answer: qestion.answer,
		options: qestion.options,
		// publishedAt: post.createdAt,
	};
}
export default mapQuestion;
