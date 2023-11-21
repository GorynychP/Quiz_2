// src/TestResult.tsx
import React from 'react';
import { Link, useParams } from 'react-router-dom';
// import { Question } from '../../../App';
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { AnswerScale } from '../../../components/test-hisory-item/components';
interface TestResultProps {
	results: number[];
	onRestart: () => void;
}

export const TestResult: React.FC<TestResultProps> = ({
	results,
	onRestart,
}) => {
	const questions = useSelector(
		(state: RootState) => state.tests.oneTest.questions,
	);
	const param = useParams();
	const totalQuestions = questions.length;
	const correctAnswers = results.reduce((sum, result) => sum + result, 0);

	return (
		<div className="test-result">
			<h2 className="text-4xl mb-5">Результаты теста</h2>
			<p>{`Правильных ответов: ${correctAnswers} из ${totalQuestions}`}</p>
			<AnswerScale result={results} totalQuestions={totalQuestions} />
			<div className="navigation-buttons">
				<button className="button-test" onClick={onRestart}>
					Пройти тест еще раз
				</button>
				<Link to={`/tests/${param.id}`}>
					<button className="button-test">Вернуться к тесту</button>
				</Link>
			</div>
		</div>
	);
};
