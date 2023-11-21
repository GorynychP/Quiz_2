import { Link, useNavigate } from 'react-router-dom';
import { QuestionType } from '../../redux/slice/questionsSlice';
import { AuthorTest, deleteTestAsync } from '../../redux/slice/testsSlice';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { formatedDate } from '../utils/formatedDate';
import { IsRole } from '../../redux/slice/userSlice';

interface CardTestProps {
	id: string;
	nameTest: string;
	author: AuthorTest;
	questions: QuestionType[];
	createdAt: string;
}

export const CardTest: React.FC<CardTestProps> = ({
	id,
	nameTest,
	author,
	questions,
	createdAt,
}) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const user = useSelector((state: RootState) => state.user.user);
	const userRole = useSelector((state: RootState) =>
		Number(state.user.user.roleId),
	);
	const removeTest = () => {
		dispatch(deleteTestAsync(id));
	};
	const formatCreatedAt = formatedDate(createdAt);
	return (
		<div className="border rounded-xl  p-3 flex items-center flex-col justify-around">
			<h2 className="text-3xl text-center">{nameTest}</h2>
			<div className="flex items-center flex-col justify-between">
				<p>Количество вопросов: {questions ? questions.length : 0}</p>
				<p>
					Автор теста: {author.name} {author.surname}
				</p>
				<p>Дата создания: {formatCreatedAt}</p>
			</div>
			<div className="flex items-center flex-col">
				{questions && questions.length !== 0 ? (
					<Link to={`/tests/${id}`} className="text-slate-200 ">
						<button className="btn btn-success w-40 m-2">
							Открыть
						</button>
					</Link>
				) : null}
				{userRole === IsRole.ADMIN || user.id === author.id ? (
					<>
						<button
							className="btn btn-warning w-40 m-2"
							onClick={() => navigate(`/myTests/${id}/edit`)}
						>
							Редактировать
						</button>
						<button
							className="btn btn-danger w-40 m-2"
							onClick={removeTest}
						>
							Удалить
						</button>
					</>
				) : null}{' '}
			</div>
		</div>
	);
};
