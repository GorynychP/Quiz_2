export const localeStorage = (newResults: number[]) => {
	const currentHistory = localStorage.getItem('history');
	const historyArr = currentHistory ? JSON.parse(currentHistory) : [];
	const newEntry = {
		results: newResults,
		date: new Date().toLocaleDateString(),
		time: new Date().toLocaleTimeString(),
	};
	historyArr.push(newEntry);
	localStorage.setItem('history', JSON.stringify(historyArr));
};
