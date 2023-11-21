import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();
const sign = process.env.JWT_SECRET;
function generate(data) {
	return jwt.sign(data, sign, { expiresIn: '30d' });
}
function verify(token) {
	return jwt.verify(token, sign);
}

export { generate, verify };
