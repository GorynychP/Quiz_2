import { mapHistory } from '../helpers/mapHistory.js';
import mapQuestion from '../helpers/mapQuestion.js';
import { mapTest } from '../helpers/mapTest.js';
import historyService from '../service/historyService.js';
import questionsService from '../service/questionsService.js';

class HistoryController {
	async getMyAll(req, res) {
		try {
			const histories = await historyService.getAllHistory({
				authorId: req.user.id,
			});
			res.send(histories.map(mapHistory));
		} catch (error) {
			console.log('Ошибка получения моих tests', error);
		}
	}

	async create(req, res) {
		try {
			const { name, authorTest, result } = req.body;
			const history = await historyService.createHistory({
				name,
				authorTest,
				result,
				author: req.user.id,
			});
			res.send(mapHistory(history));
			// return res.json(test);
		} catch (error) {
			console.log('Ошибка добавления истории прохождения теста:', error);
		}
	}
	async remove(req, res) {
		try {
			await historyService.deleteHistories(req.user.id);
			res.send({ error: null });
		} catch (error) {
			console.log('Ошибка Удаления', error);
		}
	}
}

export default new HistoryController();
