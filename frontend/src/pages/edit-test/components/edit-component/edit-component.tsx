import { useState } from 'react';
import { RootState, useAppDispatch } from '../../../../redux/store';
import { useSelector } from 'react-redux';
import {
	deleteOption,
	setItemAnswer,
	setItemOptions,
	setItemText,
} from '../../../../redux/slice/oneQuestionSlice';

// interface EditComponentProps {
// 	questionIndex: number;
// }

export const EditComponent: React.FC = () => {
	const dispatch = useAppDispatch();
	const questionText = useSelector(
		(state: RootState) => state.oneQuestion.item.text,
	);
	const questionAnswer = useSelector(
		(state: RootState) => state.oneQuestion.item.answer,
	);
	const questionOptions = useSelector(
		(state: RootState) => state.oneQuestion.item.options,
	);

	const [newOption, setNewOption] = useState<string>('');

	const handleEditQuestion = (value: string) => {
		dispatch(setItemText(value));
	};

	const handleAddOption = () => {
		const newOptions = [...questionOptions, newOption];
		dispatch(setItemOptions(newOptions));
		setNewOption('');
	};

	const handleDeleteOption = (optionIndex: number) => {
		if (optionIndex !== undefined && questionOptions) {
			dispatch(deleteOption(questionOptions[optionIndex]));
		}
	};

	const handleEditOption = (value: string, optionIndex: number) => {
		if (optionIndex !== undefined && questionOptions) {
			const updatedOptionsCopy = questionOptions.slice();
			updatedOptionsCopy[optionIndex] = value;
			dispatch(setItemOptions(updatedOptionsCopy));
		}
	};

	const updatedAnswerCopy = questionAnswer.slice();

	const handleToggleAnswer = (option: string) => {
		const index = updatedAnswerCopy.indexOf(option);

		if (index !== -1) {
			updatedAnswerCopy.splice(index, 1);
		} else {
			updatedAnswerCopy.push(option);
		}

		dispatch(setItemAnswer(updatedAnswerCopy));
	};

	return (
		<div>
			<div className="ml-8">
				<div>
					<h3 className="mb-3 text-3xl">Редактировать вопрос</h3>
					<textarea
						name="question"
						className="textarea-question"
						value={questionText}
						onChange={({ target }) =>
							handleEditQuestion(target.value)
						}
					/>
				</div>
				<div
					className=" overflow-auto mt-6"
					style={{ maxHeight: '360px' }}
				>
					<ul>
						{questionOptions.map((option, optionIndex) => (
							<li className="mb-6 flex" key={optionIndex}>
								<input
									className="checkbox"
									type="checkbox"
									name="checkbox"
									checked={updatedAnswerCopy.includes(option)}
									onChange={() => handleToggleAnswer(option)}
								/>
								<span
									className="answer cursor-pointer"
									onClick={() => handleToggleAnswer(option)}
								></span>
								<textarea
									name="answer"
									className="textarea-answer"
									value={option}
									onChange={({ target }) =>
										handleEditOption(
											target.value,
											optionIndex,
										)
									}
								/>
								<button
									className="w-8 h-6"
									onClick={() =>
										handleDeleteOption(optionIndex)
									}
								>
									❌
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="ml-8 new-option">
				<input
					className="rounded-xl p-1"
					type="text"
					name="newAnswer"
					value={newOption}
					onChange={(e) => setNewOption(e.target.value)}
					placeholder="Новый вариант ответа"
				/>
				<button className="ml-4" onClick={handleAddOption}>
					Добавить
				</button>
			</div>
		</div>
	);
};
