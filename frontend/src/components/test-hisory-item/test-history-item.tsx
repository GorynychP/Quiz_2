import { formatedDate } from '../utils/formatedDate';
import { AnswerScale } from './components';

interface TestHistoryItemProps {
	// date?: string;
	// time?: string;
	// history?: number[];
	name: string;
	result: number[];
	correctAnswers: number;
	totalQuestions: number;
	createdAt: string;
	authorTest: string;
}

export const TestHistoryItem: React.FC<TestHistoryItemProps> = ({
	result,
	correctAnswers,
	totalQuestions,
	name,
	createdAt,
	authorTest,
}) => {
	const formatData = formatedDate(createdAt);
	return (
		<div className="test-history">
			<div className="w-96">
				{/* <p>{date}</p> */}
				<p>Название теста: {name}</p>
				<p>Автор теста: {authorTest}</p>
				<p>Дата прохождения: {formatData}</p>
			</div>
			<div className="w-96">
				<AnswerScale result={result} totalQuestions={totalQuestions} />
			</div>
			<div className="text-3xl">
				{correctAnswers} из {totalQuestions}
			</div>
		</div>
	);
};
