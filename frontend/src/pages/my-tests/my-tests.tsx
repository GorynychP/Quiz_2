import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { CardAdd, CardTest } from '../../components';
import { fetchMyTestsAsync } from '../../redux/slice/testsSlice';
import { useEffect } from 'react';
import { StatusEnum } from '../../redux/slice/questionsSlice';

export const MyTests = () => {
	const dispatch = useAppDispatch();
	const tests = useSelector((state: RootState) => state.tests.tests);
	const status = useSelector((state: RootState) => state.tests.statusMy);
	useEffect(() => {
		const fetchData = async () => {
			try {
				dispatch(fetchMyTestsAsync());
			} catch (error) {
				console.error('Ошибка получения моих Тестов:', error);
			}
		};

		fetchData();
	}, [dispatch]);
	if (status === StatusEnum.LOADING) {
		return (
			<div className="spinner-border " role="status">
				<span className="visually-hidden">Loading...</span>
			</div>
		);
	}

	return (
		<div className="flex justify-center flex-col ">
			<div className="grid gap-4 grid-cols-5" style={{ width: '1500px' }}>
				{tests && tests.length !== 0 ? (
					tests.map((test) => (
						<CardTest
							key={test.id}
							id={test.id}
							nameTest={test.name}
							author={test.author}
							questions={test.questions}
							createdAt={test.createdAt}
						/>
					))
				) : (
					<h1 className="text-center">У ваc пока нет тестов</h1>
				)}
				<CardAdd />
			</div>
		</div>
	);
};
