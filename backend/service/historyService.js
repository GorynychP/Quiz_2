import { config } from 'dotenv';
import Question from '../models/Question.js';
import Test from '../models/Test.js';
import History from '../models/History.js';

config();

class HistoryService {
	async getAllHistory({ authorId }) {
		const histories = await History.find({ author: authorId }).populate(
			'author',
		);
		return histories;
	}

	async getOneQuestion(testId, questionId) {
		const question = await Question.findOne({ _id: questionId });
		return question;
	}

	async editQuestion(questionId, updateQuestion) {
		const question = await Question.updateOne(
			{ _id: questionId },
			{
				text: updateQuestion.text,
				options: updateQuestion.options,
				answer: updateQuestion.answer,
			},
		);
		return question;
	}

	async createHistory(history) {
		const newHistori = await History.create(history);
		await newHistori.populate('author');
		return newHistori;
	}
	// async addTest(test) {
	// 		const newTest = await Test.create(test);
	// 		await newTest.populate({
	// 			path: 'questions',
	// 			populate: 'author',
	// 		});
	// 		await newTest.populate('author');
	// 		return newTest;
	// 	}
	async deleteHistories(authorId) {
		await History.deleteMany({ author: authorId });
	}
}

export default new HistoryService();
