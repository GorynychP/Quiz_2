export default function (roles) {
	return (req, res, next) => {
		if (!roles.includec(req.user.role)) {
			res.send({ error: 'Доступ запрещен' });
		}
		next();
	};
}
