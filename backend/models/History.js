import mongoose from 'mongoose';

const HistorySchema = mongoose.Schema(
	{
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		name: {
			type: String,
			required: true,
		},
		authorTest: {
			type: String,
			required: true,
		},
		result: {
			type: [Number],
			required: true,
		},
	},
	{ timestamps: true },
);

const History = mongoose.model('History', HistorySchema);

export default History;
