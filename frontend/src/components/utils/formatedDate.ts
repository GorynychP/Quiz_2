export const formatedDate = (publishedAt: string) => {
	const formatDate = new Date(publishedAt).toLocaleDateString();
	return formatDate;
};
