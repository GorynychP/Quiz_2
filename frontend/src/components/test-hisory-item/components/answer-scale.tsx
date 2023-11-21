import React, { useEffect, useState } from 'react';

interface AnswerScale {
	result: number[];
	totalQuestions: number;
}

export const AnswerScale: React.FC<AnswerScale> = ({
	result,
	totalQuestions,
}) => {
	const [answers, setAnswers] = useState<boolean[]>(
		Array(totalQuestions).fill(false),
	);

	const heandleAnswer = () => {
		setAnswers(result.map((answer) => answer === 1));
	};

	useEffect(() => {
		heandleAnswer();
	}, [result]);
	return (
		<div className="flex justify-around">
			<div
				className="flex text-center overflow-hidden border rounded-xl"
				style={{
					width: '100%',
					// display: 'flex',
					// alignItems: 'center',
					// width: '200px',
					// overflow: 'hidden',
					// border: '1px solid',
					// borderRadius: '14px',
				}}
			>
				{answers.map((isCorrect, index) => (
					<div
						key={index}
						style={{
							width: '100%',
							height: '20px',
							border: '1px solid #fff',
							backgroundColor: isCorrect ? 'green' : '#bc3535',
							lineHeight: '1',
						}}
					>
						{index + 1}
					</div>
				))}
			</div>
		</div>
	);
};
