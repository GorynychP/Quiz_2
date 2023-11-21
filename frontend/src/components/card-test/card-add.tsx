import { createTestAsync } from '../../redux/slice/testsSlice';

import { useAppDispatch } from '../../redux/store';

export const CardAdd: React.FC = () => {
	const dispatch = useAppDispatch();

	const addTest = () => {
		const name = prompt('Название теста');
		if (!name) {
			return;
		}
		const newTest = {
			name: name,
		};
		dispatch(createTestAsync(newTest));
	};
	return (
		<div className="border rounded-xl  p-3 flex items-center justify-center ">
			<button className="button-test w-40 " onClick={addTest}>
				Добавить Тест
			</button>
		</div>
	);
};
