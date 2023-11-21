import mongoose from 'mongoose';
import ROLES from '../constants/role.js';
import validator from 'validator';
const UserSchema = mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			validator: {
				validator: validator.isEmail,
				message: 'Неверный адрес электронной почты',
			},
		},
		name: {
			type: String,
			required: true,
		},
		surname: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			default: ROLES.USER,
		},
	},
	{ timestamps: true },
);
const User = mongoose.model('User', UserSchema);

export default User;
