import mongoose from 'mongoose';

const TestSchema = mongoose.Schema(
	{
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		name: {
			type: String,
		},
		questions: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Question',
			},
		],
	},
	{ timestamps: true },
);

const Test = mongoose.model('Test', TestSchema);

export default Test;
