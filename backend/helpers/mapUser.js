export function mapUser(user) {
	return {
		id: user.id,
		email: user.email,
		name: user.name,
		surname: user.surname,
		roleId: user.role,
		registeredAt: user.createdAt,
	};
}
