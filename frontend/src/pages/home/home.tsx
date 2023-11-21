import { useEffect, useState } from 'react';
import { RootState, useAppDispatch } from '../../redux/store';
import { fetchTestsAsync } from '../../redux/slice/testsSlice';
import { useSelector } from 'react-redux';
import { CardTest, Pagination } from '../../components';
import { StatusEnum } from '../../redux/slice/questionsSlice';
import { PAGINATION_LIMIT } from '../../components/constants/pagination-limit';

export const Home = () => {
	const dispatch = useAppDispatch();
	const tests = useSelector((state: RootState) => state.tests.tests);
	const status = useSelector((state: RootState) => state.tests.status);
	const limitPage = useSelector((state: RootState) => state.tests.lastPage);
	const [page, setPage] = useState<number>(1);
	// const [limitPage, setLimitPage] = useState<number>(1);
	useEffect(() => {
		const fetchData = async () => {
			try {
				dispatch(fetchTestsAsync({ page, PAGINATION_LIMIT }));
			} catch (error) {
				console.error('Error in useEffect:', error);
			}
		};

		fetchData();
	}, [dispatch, page]);
	if (status === StatusEnum.LOADING) {
		return (
			<div className="spinner-border" role="status">
				<span className="visually-hidden">Loading...</span>
			</div>
		);
	}

	return (
		<div
			className="flex flex-col items-center relative"
			style={{ minHeight: '800px' }}
		>
			<div className="flex justify-center">
				<div
					className="grid gap-4 grid-cols-5"
					style={{ width: '1500px' }}
				>
					{tests ? (
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
						<h1>Тесов нет</h1>
					)}
				</div>
			</div>
			{limitPage > 1 && (
				<div className="absolute bottom-8">
					<Pagination
						page={page}
						setPage={setPage}
						limitPage={limitPage}
					/>
				</div>
			)}
		</div>
	);
};
