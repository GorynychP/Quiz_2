import { mapUser } from '../helpers/mapUser.js';
import userService from '../service/userService.js';
import { config } from 'dotenv';
config();
class UserController {
	async register(req, res) {
		try {
			const { user, token } = await userService.registration(
				req.body.email,
				req.body.password,
				req.body.name,
				req.body.surname,
			);
			res.cookie('token', token, { httpOnly: true }).send({
				error: null,
				user: mapUser(user),
			});
		} catch (error) {
			if (error.code === 11000) {
				res.send({
					error: 'Адрес электронной почты уже зарегистрирован',
					error,
				});
				return;
			}
			res.send({ error: error.message || 'Unknown error' });
			console.log('Ошибка добавления ', e);
		}
	}

	async login(req, res) {
		try {
			const { user, token } = await userService.loginUser(
				req.body.email,
				req.body.password,
			);
			res.cookie('token', token, {
				httpOnly: true,
			}).send({
				error: null,
				user: mapUser(user),
			});
		} catch (error) {
			res.send({ error: error.message || 'Unknown error' });
		}
	}

	async logout(req, res) {
		// res.clearCookie('token');
		res.cookie('token', '', {
			httpOnly: true,
			expires: new Date(0),
			path: '/',
		}).send({});
	}

	async getOne(req, res) {
		try {
			const user = await userService.getOneUser(req.user.id);
			res.send(mapUser(user));
		} catch (error) {
			res.send({ error: error.message || 'Unknown error' });
			console.log('Ошибка получения одного user', error);
		}
	}
	async update(req, res) {
		try {
			const updateUser = req.body;
			const newUser = await userService.editUser(req.user.id, updateUser);

			return res.send({
				error: null,
				user: mapUser(newUser),
			});
		} catch (error) {
			if (error.code === 11000) {
				res.send({
					error: 'Адрес электронной почты уже зарегистрирован',
					user: null,
				});
				return;
			}
			res.send({ error: error.message || 'Unknown error' });
		}
	}

	// async getAll(req, res) {
	// 	try {
	// 		const questions = await questionsService.getAllQuestions();
	// 		res.send(questions.map(mapQuestion));
	// 		// res.json(questions.map(mapQuestion));
	// 	} catch (error) {
	// 		console.log('Ошибка получения весех questions', error);
	// 	}
	// }

	// async remove(req, res) {
	// 	try {
	// 		const { id } = req.params;
	// 		await questionsService.deleteQuestion(id);

	// 		return res.json(id);
	// 	} catch (error) {
	// 		console.log('Ошибка Удаления', error);
	// 	}
	// }
}

export default new UserController();
