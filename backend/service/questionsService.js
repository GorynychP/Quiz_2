import { config } from 'dotenv';
import Question from '../models/Question.js';
import Test from '../models/Test.js';

config();

class QuestionService {
	async getAllQuestions() {
		const questions = await Question.find();
		return questions;
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

	async createQuestion(testId, question) {
		const newQuestion = await Question.create(question);
		await Test.findByIdAndUpdate(testId, {
			$push: { questions: newQuestion },
		});
		await newQuestion.populate('author');
		return newQuestion;
	}

	async deleteQuestion(testId, questionId) {
		await Question.deleteOne({ _id: questionId });
		await Test.findByIdAndUpdate(testId, {
			$pull: { questions: questionId },
		});
	}
}

export default new QuestionService();
