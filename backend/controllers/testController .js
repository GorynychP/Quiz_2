import { mapTest } from '../helpers/mapTest.js';
import testService from '../service/testService.js';
import { config } from 'dotenv';
config();
class TestController {
	async getAll(req, res) {
		try {
			const { tests, lastPage } = await testService.getAllTests(
				req.query.search,
				req.query.limit,
				req.query.page,
			);
			res.send({ lastPage, tests: tests.map(mapTest) });
		} catch (error) {
			console.log('Ошибка получения весех tests', error);
		}
	}
	async getMyAll(req, res) {
		try {
			const tests = await testService.getAllMyTests({
				authorId: req.user.id,
			});
			res.send(tests.map(mapTest));
		} catch (error) {
			console.log('Ошибка получения моих tests', error);
		}
	}
	async create(req, res) {
		try {
			const { name } = req.body;
			const test = await testService.addTest({
				name,
				author: req.user.id,
			});
			res.send(mapTest(test));
			// return res.json(test);
		} catch (error) {
			console.log('Ошибка добавления ', error);
		}
	}

	async getOne(req, res) {
		try {
			const test = await testService.getOneTest(req.params.testId);
			return res.send(mapTest(test));
		} catch (error) {
			console.log('Ошибка получения одного объекта test', error);
		}
	}
	async remove(req, res) {
		try {
			await testService.deleteTest(req.params.testId);
			res.send({ error: null });
		} catch (error) {
			console.log('Ошибка Удаления', error);
		}
	}
	async update(req, res) {
		try {
			const updateTest = req.body;
			const testId = req.params.testId;
			const userId = req.user.id;
			const newUpdateTest = await testService.editTest(
				testId,
				updateTest,
				userId,
			);
			if (newUpdateTest.acknowledged) {
				return res.json(updateTest);
			}
		} catch (error) {
			return res.send({ error: error.message || 'Unknown error' });
		}
	}
	// async update(req, res) {
	// 	try {
	// 		const updateTest = req.body;
	// 		const testId = req.params.testId;
	// 		const newUpdateTest = await testService.editTest(
	// 			testId,
	// 			updateTest,
	// 		);
	// 		return res.json(mapTest(newUpdateTest));
	// 	} catch (error) {
	// 		console.log('Ошибка Обновленя', error);
	// 	}
	// }
}

export default new TestController();
