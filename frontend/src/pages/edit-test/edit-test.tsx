import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { EditComponent } from './components';
import { RootState, useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { StatusEnum } from '../../redux/slice/questionsSlice';
// import { fetchQuestionsAsync } from '../../redux/slice/questionsSlice';
import {
	fetchOneQuestionAsync,
	updateQuestionAsync,
} from '../../redux/slice/oneQuestionSlice';
import {
	createQuestionAsync,
	deleteQuestionAsync,
	fetchOneTestAsync,
	updateTestAsync,
} from '../../redux/slice/testsSlice';
import { IsRole } from '../../redux/slice/userSlice';

export const EditTest: React.FC = () => {
	const test = useSelector((state: RootState) => state.tests.oneTest);
	const question = useSelector((state: RootState) => state.oneQuestion.item);
	const user = useSelector((state: RootState) => state.user.user);
	const oneQuestions = useSelector(
		(state: RootState) => state.oneQuestion.item,
	);
	const status = useSelector((state: RootState) => state.tests.statusOne);

	const dispatch = useAppDispatch();
	const params = useParams();
	const navigate = useNavigate();
	const [questionIndex, setQuestionIndex] = useState<number | null>(null);
	const userRole = useSelector((state: RootState) =>
		Number(state.user.user.roleId),
	);
	const [editNameTest, seteditNameTest] = useState<boolean>(false);
	const [NameTest, setNameTest] = useState<string>(test.name);

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (params.id) {
					dispatch(fetchOneTestAsync(params.id));
				}
			} catch (error) {
				console.error('Error in useEffect:', error);
			}
		};
		setNameTest(test.name);
		fetchData();
	}, [dispatch, params.id, test.name]);

	const nextQuestion = (questionId: string, index: number) => {
		const testId = params.id;
		navigate(`/myTests/${testId}/edit`);
		setQuestionIndex(index);
		if (testId) {
			dispatch(
				fetchOneQuestionAsync({
					testId: testId,
					questionId: questionId,
				}),
			);
		}
	};

	const handleDeleteQuestion = () => {
		if (questionIndex !== null) {
			const testId = params.id;
			const questionId = question.id;
			if (test.questions.length <= 1) {
				alert('Тест должен содержать хотя бы один вопрос');
				return;
			}

			if (testId) {
				dispatch(
					deleteQuestionAsync({
						testId,
						questionId,
					}),
				);
			}
			// navigate('/editTest');
			if (test.questions.length > 1) {
				setQuestionIndex(test.questions.length - 2);
				return;
			}
			setQuestionIndex(null);
		}
	};
	const handleAddQuestion = () => {
		const newQuestion = {
			answer: ['Ответ№1'],
			text: 'Новый вопрос',
			options: ['Ответ№1', 'Ответ№2', 'Ответ№3', 'Ответ№4'],
		};

		if (params.id) {
			dispatch(
				createQuestionAsync({
					testId: params.id,
					newQuestion: newQuestion,
				}),
			);
		}

		// setQuestionIndex(test.questions.length - 1);
	};

	const handleSave = () => {
		if (params.id) {
			dispatch(
				updateQuestionAsync({
					testId: params.id,
					newQuestion: oneQuestions,
				}),
			);
		}
	};

	const saveNameTest = () => {
		if (test.name !== NameTest && params.id) {
			dispatch(
				updateTestAsync({
					testId: params.id,
					updateTest: { name: NameTest },
				}),
			);
		}

		seteditNameTest(!editNameTest);
	};
	if (
		(userRole !== IsRole.ADMIN && test.author.id !== user.id) ||
		(userRole === IsRole.ADMIN && test.author.id === user.id)
	) {
		if (status === StatusEnum.LOADING) {
			return (
				<div className="edit-test-container">
					<div className="spinner-border" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				</div>
			);
		}
		return (
			<h1 className="text-red-500 flex justify-center">
				Доступ запрeщен ❌
			</h1>
		);
	}
	return (
		<div
			className={
				questionIndex !== null
					? 'edit-container'
					: 'edit-test-container'
			}
		>
			<div className="question-container">
				<div className="question-list">
					<div className="flex justify-between items-center">
						<h2 className="text-2xl">
							Название теста:{' '}
							{editNameTest ? (
								<input
									className="w-52 p-1"
									type="text"
									value={NameTest}
									onChange={({ target }) =>
										setNameTest(target.value)
									}
								/>
							) : (
								test.name
							)}
						</h2>
						{!editNameTest ? (
							<span
								className="cursor-pointer text-amber-600 underline"
								onClick={() => seteditNameTest(!editNameTest)}
							>
								ред
							</span>
						) : (
							<span
								className="cursor-pointer text-green-600 underline"
								onClick={saveNameTest}
							>
								сохрн
							</span>
						)}
					</div>
					{test.questions.map((question, index) => (
						<div
							key={index}
							className={`question-item ${
								index === questionIndex ? 'selected' : ''
							}`}
							onClick={() => nextQuestion(question.id, index)}
						>
							<span className="font-bold  mr-2">
								{`Вопрос: ${index + 1}.  `}{' '}
							</span>
							{question.text}
						</div>
					))}
				</div>
				<div className="mt-5 flex">
					<Link to="/myTests">
						<button className="button-test hover:bg-green-600">
							Вернуться к моим тестам
						</button>
					</Link>
					<button
						className="button-test hover:bg-green-600"
						onClick={handleAddQuestion}
					>
						Добавить 📝
					</button>
				</div>
			</div>

			<div
				className="flex flex-col justify-between "
				style={{ width: '65%' }}
			>
				{questionIndex !== null && (
					<>
						<EditComponent />
						<div className="mt-10">
							<button
								className="button-test bg-red-500 w-44 hover:bg-red-400"
								onClick={handleDeleteQuestion}
							>
								Удалить вопрос
							</button>
							<button
								className="button-test bg-orange-500 hover:bg-orange-400"
								onClick={() => setQuestionIndex(null)}
							>
								Отменить
							</button>
							<button
								className="button-test hover:bg-green-600"
								onClick={handleSave}
							>
								Сохранить
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};
