import { verify } from '../helpers/token.js';
import { config } from 'dotenv';
config();
import User from '../models/User.js';
import { mapUser } from '../helpers/mapUser.js';
// export default async function authenticated(req, res, next) {
// 	const tokenData = verify(req.cookies.token);

// 	const user = await User.findOne({ _id: tokenData.id });
// 	if (!user) {
// 		res.send({ error: 'Authenticated user not found' });
// 		return;
// 	}

// 	req.user = user;

// 	next();
// }
export default async function authenticated(req, res, next) {
	try {
		const token = req.cookies.token;
		if (!token) {
			res.status(401).json({ error: 'Token not provided' });

			return;
		}
		const tokenData = verify(req.cookies.token);
		const user = await User.findOne({ _id: tokenData.id });
		if (!user) {
			res.status(401).json({ error: 'Сбой проверки подлинности' });
			return;
		}

		req.user = user;
		// res.locals.user = mapUser(user);
		next();
	} catch (error) {
		console.error('Authentication error:', error.message);
		res.status(401).json({ error: 'Сбой проверки подлинности' });
	}
}
