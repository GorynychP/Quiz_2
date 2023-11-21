import { config } from 'dotenv';
import Test from '../models/Test.js';
import Question from '../models/Question.js';

config();

class TestService {
	async getAllTests(search = '', limit = 10, page = 1) {
		const [tests, count] = await Promise.all([
			Test.find()
				.limit(limit)
				.skip((page - 1) * limit)
				.sort({ createdAt: -1 })
				.populate('author')
				.populate('questions'),
			Test.countDocuments({ name: { $regex: search, $options: 'i' } }),
		]);
		return {
			tests,
			lastPage: Math.ceil(count / limit), // Определили сколько всего страниц
		};
	}
	async getAllMyTests({ authorId }) {
		const tests = await Test.find({ author: authorId })
			.populate('author')
			.populate('questions');
		return tests;
	}
	async addTest(test) {
		const newTest = await Test.create(test);
		await newTest.populate({
			path: 'questions',
			populate: 'author',
		});
		await newTest.populate('author');
		return newTest;
	}

	async getOneTest(testId) {
		const test = await Test.findOne({ _id: testId })
			.populate('author')
			.populate('questions');
		return test;
	}
	// async editTest(testId, newTest) {
	// 	const updateTest = await Test.findOneAndUpdate(
	// 		{ _id: testId },
	// 		{ $set: newTest },
	// 		{ new: true },
	// 	)
	// 		.populate('author')
	// 		.populate('questions');
	// 	return updateTest;
	// }

	async editTest(testId, newTest, userId) {
		const test = await Test.findOne({ _id: testId, author: userId });

		if (!test) {
			throw new Error('Тест не найден или вы не являетесь его автором.');
		}
		const updateTest = await Test.updateOne(
			{ _id: testId },
			{ $set: newTest },
		);
		return updateTest;
	}
	async deleteTest(testId) {
		const test = await Test.findById(testId);
		if (!test) {
			return;
		}
		const questionIds = test.questions.map((question) => question._id);
		await Question.deleteMany({ _id: { $in: questionIds } });
		await Test.deleteOne({ _id: testId });
	}
}

export default new TestService();
