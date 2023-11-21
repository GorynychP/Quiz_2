import { config } from 'dotenv';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { generate } from '../helpers/token.js';
config();

class UserService {
	async registration(email, password, name, surname) {
		if (!password) {
			throw new Error('Введите пароль');
		}
		if (!email) {
			throw new Error('Введите email');
		}
		const passwordHash = await bcrypt.hash(password, 10);
		const user = await User.create({
			email,
			name,
			surname,
			password: passwordHash,
		});
		const token = generate({ id: user.id });
		return { user, token };
	}

	async loginUser(email, password) {
		if (!email && !password) {
			throw new Error('Пароль и email не могут быть пустыми');
		}
		const user = await User.findOne({ email });
		if (!user) {
			throw new Error('Такого пользователья нет');
		}
		const isPasswordMatch = await bcrypt.compare(password, user.password);
		if (!isPasswordMatch) {
			throw new Error('Неверный пароль');
		}
		const token = generate({ id: user.id });
		return { user, token };
	}

	async getOneUser(id) {
		const user = await User.findOne({ _id: id });
		return user;
	}
	async editUser(id, updateUser) {
		const user = await User.findByIdAndUpdate(id, updateUser, {
			returnDocument: 'after',
		});
		return user;
	}
	// async getAllQuestions() {
	// 	const questions = await Question.find();
	// 	return questions;
	// }

	// async deleteQuestion(id) {
	// 	await Question.deleteOne({ _id: id });
	// }
}

export default new UserService();
