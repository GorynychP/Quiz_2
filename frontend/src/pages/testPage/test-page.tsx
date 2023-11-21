import { Link, useParams } from 'react-router-dom';
import styles from './test-page.module.scss';
import { TestHistoryItem } from '../../components/test-hisory-item/test-history-item';
import { useEffect } from 'react';
import { RootState, useAppDispatch } from '../../redux/store';
import { fetchOneTestAsync } from '../../redux/slice/testsSlice';
import { useSelector } from 'react-redux';
import { StatusEnum } from '../../redux/slice/questionsSlice';
import {
	deleteHistoryAsync,
	fetchHistoriesAsync,
} from '../../redux/slice/historiesSlice';
import { formatedDate } from '../../components/utils/formatedDate';

// interface LocalHistoryEntry {
// 	results: [];
// 	date: string;
// 	time: string;
// }
interface HistoryEntry {
	id: string;
	name: string;
	result: number[];
	authorTest: string;
	createdAt: string;
}

export const TestPage: React.FC = () => {
	const test = useSelector((state: RootState) => state.tests.oneTest);
	const status = useSelector((state: RootState) => state.tests.statusOne);
	const histories = useSelector(
		(state: RootState) => state.history.histories,
	);
	const user = useSelector((state: RootState) => state.user.user);
	const dispatch = useAppDispatch();
	const { id } = useParams();
	// const raw = localStorage.getItem('history');
	// const historyResult = raw ? JSON.parse(raw) : null;
	// const [result, setResult] = useState(historyResult);
	const findTrueAnswer = (results: number[]) => {
		const correctAnswers = results.reduce((sum, result) => sum + result, 0);
		return correctAnswers;
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (user.id) {
					dispatch(fetchHistoriesAsync());
				}
			} catch (error) {
				console.error('Error in useEffect:', error);
			}
		};

		fetchData();
	}, [dispatch, user.id]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				if (id) {
					dispatch(fetchOneTestAsync(id));
					// dispatch(fetchHistoriesAsync());
				}
			} catch (error) {
				console.error('Error in useEffect:', error);
			}
		};

		fetchData();
	}, [dispatch, id]);

	const formatDate = formatedDate(test.createdAt);
	if (status === StatusEnum.LOADING) {
		return (
			<div>
				<h2 className="text-3xl">Загрузка...</h2>
			</div>
		);
	}
	return (
		<div className={`${styles.main}`}>
			<div className="ml-8">
				<div>
					<h1 className="text-red-600">
						Название теста:
						<span className="text-green-600">
							{' '}
							{test.name}
						</span>{' '}
					</h1>
					<h3 className="text-red-500">
						Количество вопросов:{' '}
						<span className="text-green-500">
							{test.questions ? test.questions.length : 0}
						</span>
					</h3>
					<h3 className="text-red-400">
						Имя автора:{' '}
						<span className="text-green-400">
							{test.author.name} {test.author.surname}
						</span>
					</h3>
					<h3 className="text-red-300">
						Дата создания:{' '}
						<span className="text-green-300">{formatDate} </span>
					</h3>
				</div>
				<div className="mt-12">
					<Link to={`/test/${id}`}>
						<button className="button-test m-0 hover:bg-green-600">
							Запустить тест
						</button>
					</Link>
					{user.id === test.author.id && (
						<Link to={`/myTests/${id}/edit`}>
							<button className="button-test bg-orange-500 hover:bg-orange-400">
								Редактировать тест
							</button>
						</Link>
					)}
				</div>
				{user.id && (
					<div className=" mt-8">
						<div className="">
							<h2 className="mb-3.5 text-3xl">История тестов</h2>
							{histories.length > 0 ? (
								<h5
									className=" cursor-pointer underline mb-3"
									onClick={() =>
										dispatch(deleteHistoryAsync())
									}
								>
									Очистить историю
								</h5>
							) : null}
						</div>

						{/* {historyResult ? (
						historyResult.map(
							(history: LocalHistoryEntry, index: number) => (
								<TestHistoryItem
									key={index}
									date={history.date}
									time={history.time}
									history={history.results}
									correctAnswers={findTrueAnswer(
										history.results,
									)}
									totalQuestions={history.results.length}
								/>
							),
						)
					) : (
						<div>У вас пока нет истории прохождения тестов</div>
					)} */}
						{histories.length > 0 ? (
							histories.map(
								(history: HistoryEntry, index: number) => (
									<TestHistoryItem
										key={index}
										name={history.name}
										createdAt={history.createdAt}
										result={history.result}
										correctAnswers={findTrueAnswer(
											history.result,
										)}
										authorTest={history.authorTest}
										totalQuestions={history.result.length}
									/>
								),
							)
						) : (
							<div>У вас пока нет истории прохождения тестов</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};
