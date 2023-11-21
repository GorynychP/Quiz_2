import mongoose from 'mongoose';
import mapQuestion from './mapQuestion.js';

export function mapTest(test) {
	return {
		id: test.id,
		name: test.name,
		author: {
			id: test.author.id,
			name: test.author.name,
			surname: test.author.surname,
		},
		questions: test.questions.map((question) =>
			mongoose.isObjectIdOrHexString(question)
				? question
				: mapQuestion(question),
		),
		createdAt: test.createdAt,
	};
}
