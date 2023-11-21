import { useState, useEffect } from 'react';
import { TestResult } from './components/test-result';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { useParams } from 'react-router-dom';
import { fetchOneTestAsync } from '../../redux/slice/testsSlice';
import { createHistoryAsync } from '../../redux/slice/historiesSlice';
// import { StatusEnum } from '../../redux/slice/questionsSlice';
// import { localeStorage } from '../../components/utils/localeStorage';

export const TestExecution: React.FC = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const [isTestComplete, setIsTestComplete] = useState(false);
	const questions = useSelector(
		(state: RootState) => state.tests.oneTest.questions,
	);
	const isAuth = useSelector((state: RootState) => state.user.isAuth);
	const Test = useSelector((state: RootState) => state.tests.oneTest);
	useEffect(() => {
		const fetchData = async () => {
			try {
				if (id) {
					dispatch(fetchOneTestAsync(id));
				}
			} catch (error) {
				console.error('Ошибка загрузки Теста:', error);
			}
		};

		fetchData();
	}, [id, dispatch]);
	// const status = useSelector((state: RootState) => state.questions.status);
	const [testResults, setTestResults] = useState<number[]>(
		new Array(questions.length).fill(0),
	);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
	const handleOptionSelect = (option: string) => {
		const updatedSelectedOptions = [...selectedOptions];
		updatedSelectedOptions[currentQuestionIndex] = option;
		setSelectedOptions(updatedSelectedOptions);
	};

	const handleNextQuestion = () => {
		setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
	};

	const handlePreviousQuestion = () => {
		setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
	};

	const handleCompleteTest = () => {
		const newResults = selectedOptions.map((selectedOption, index) => {
			const answerArray = questions[index].answer as string[] | undefined;
			return answerArray
				? answerArray.includes(selectedOption)
					? 1
					: 0
				: 0;
		});

		const resultHistory = {
			name: Test.name,
			authorTest: `${Test.author.name} ${Test.author.surname} `,
			result: newResults,
		};
		if (isAuth) {
			dispatch(createHistoryAsync(resultHistory));
		} else {
			// localeStorage(newResults);
		}
		setTestResults(newResults);
		setIsTestComplete(true);
	};

	const handleRestartTest = () => {
		setIsTestComplete(false);
		setTestResults([]);
		setSelectedOptions([]);
		setCurrentQuestionIndex(0);
	};

	const renderOptions = (options: string[]) => {
		return options.map((option, index) => (
			<div key={index} className="option">
				<input
					className="ml-5"
					type="checkbox"
					checked={selectedOptions[currentQuestionIndex] === option}
					onChange={() => handleOptionSelect(option)}
				/>
				<label className="ml-5 text-2xl">{option}</label>
			</div>
		));
	};
	const currentQuestion = questions[currentQuestionIndex];
	if (!currentQuestion) {
		return;
	}
	// if (status === StatusEnum.LOADING) {
	// 	return <div>Загрузка....</div>;
	// }

	if (isTestComplete) {
		return (
			<TestResult results={testResults} onRestart={handleRestartTest} />
		);
	}
	return (
		<div className="test-container">
			<h2 className="text-5xl">Вопрос {currentQuestionIndex + 1}</h2>
			<p className="text-3xl mt-3 mb-3"> {currentQuestion.text}</p>
			<div className="options">
				{renderOptions(currentQuestion.options)}
			</div>
			<div className="flex justify-between mt-5">
				<button
					className="button-test bg-slate-400 hover:bg-orange-400"
					onClick={handlePreviousQuestion}
					disabled={currentQuestionIndex === 0}
				>
					Предыдущий вопрос
				</button>
				{currentQuestionIndex < questions.length - 1 ? (
					<button
						className="button-test bg-slate-400 hover:bg-orange-400"
						onClick={handleNextQuestion}
					>
						Следующий вопрос
					</button>
				) : (
					<button
						className="button-test "
						onClick={() => {
							selectedOptions.length === questions.length
								? handleCompleteTest()
								: alert('Вы ответили не на все вопросы');
						}}
					>
						Завершить тест
					</button>
				)}
			</div>
		</div>
	);
};
