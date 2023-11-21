interface PaginationProps {
	page: number;
	limitPage: number;
	setPage: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
	setPage,
	page,
	limitPage,
}) => {
	return (
		<nav aria-label="Page navigation example">
			<ul className="pagination">
				<li className={`page-item ${page === 1 ? 'disabled ' : ''}`}>
					<button
						className="page-link w-24 bg-slate-900 hover:bg-slate-700 disabled:bg-slate-400 "
						disabled={page === 1}
						onClick={() => setPage(1)}
						aria-label="Previous"
					>
						<span aria-hidden="true">В начало</span>
					</button>
				</li>
				<li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
					<button
						className="page-link bg-slate-900 hover:bg-slate-700 disabled:bg-slate-400"
						disabled={page === 1}
						onClick={() => setPage(page - 1)}
						aria-label="Previous"
					>
						<span aria-hidden="true">&laquo;</span>
					</button>
				</li>
				<li className="page-item">
					<div className="page-link">{page}</div>
				</li>

				<li
					className={`page-item ${
						page === limitPage ? 'disabled' : ''
					}`}
				>
					<button
						className="page-link  bg-slate-900 hover:bg-slate-700 disabled:bg-slate-400"
						aria-label="Next"
						disabled={page === limitPage}
						onClick={() => setPage(limitPage)}
					>
						<span aria-hidden="true">&raquo;</span>
					</button>
				</li>
				<li
					className={`page-item ${
						page === limitPage ? 'disabled' : ''
					}`}
				>
					<button
						className="page-link w-24 bg-slate-900 hover:bg-slate-700 disabled:bg-slate-400"
						disabled={page === limitPage}
						onClick={() => setPage(limitPage)}
						aria-label="Next"
					>
						<span aria-hidden="true">В конец</span>
					</button>
				</li>
			</ul>
		</nav>
	);
};
