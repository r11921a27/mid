import {prisma} from '../../../../adapters.js';

export async function getAllUsers(request, res) {
	const allUsers = await prisma.user.findMany();
	return res.json(allUsers);
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function createOneUser(request, res) {
	const user = await prisma.user.create({data: {name: request.body.name}});
	return res.status(201).json(user);
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function getOneUser(request, res) {
	const id = Number.parseInt(request.params.id);
	if (isNaN(id)) {
		return res.status(400).json({error: 'Invalid id'});
	}

	const user = await prisma.user.findUnique({where: {id}});
	if (user === null) {
		return res.status(404).json({error: 'Not Found'});
	}

	return res.json(user);
}
