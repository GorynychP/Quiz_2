import mapQuestion from '../helpers/mapQuestion.js';
import { mapTest } from '../helpers/mapTest.js';
import questionsService from '../service/questionsService.js';

class QuestionController {
	async getAll(req, res) {
		try {
			const questions = await questionsService.getAllQuestions();
			res.send(questions.map(mapQuestion));
			// res.json(questions.map(mapQuestion));
		} catch (error) {
			console.log('Ошибка получения весех questions', error);
		}
	}
	async getOne(req, res) {
		try {
			const question = await questionsService.getOneQuestion(
				req.params.testId,
				req.params.questionId,
			);
			return res.json(mapQuestion(question));
		} catch (error) {
			console.log('Ошибка получения одного объекта question', error);
		}
	}
	async create(req, res) {
		try {
			const { text, answer, options } = req.body;
			const question = await questionsService.createQuestion(
				req.params.testId,
				{ author: req.user.id, text, answer, options },
			);
			res.send(mapQuestion(question));
			// return res.json(question);
		} catch (error) {
			console.log('Ошибка добавления Теста ', error);
		}
	}
	async remove(req, res) {
		try {
			await questionsService.deleteQuestion(
				req.params.testId,
				req.params.questionId,
			);

			res.send({ error: null });
		} catch (error) {
			console.log('Ошибка Удаления', error);
		}
	}

	async update(req, res) {
		try {
			const updateQuestion = req.body;
			await questionsService.editQuestion(
				req.params.questionId,
				updateQuestion,
			);

			return res.json(updateQuestion);
		} catch (error) {
			console.log('Ошибка Обновленя', error);
		}
	}
}

export default new QuestionController();
