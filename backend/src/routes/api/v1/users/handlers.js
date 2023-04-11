import bcrypt from 'bcrypt';
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
	const {name, password} = request.body;

	if (!name || !password) {
		return res.status(400).json({error: 'Username and password are required'});
	}

	try {
		const salt = await bcrypt.genSalt(10);
 		const hashedPassword = await bcrypt.hash(password, salt);

		const user = await prisma.user.create({
			data: {
				name,
				hashed_password: hashedPassword,
			},
		});

		return res.status(201).json(user);
	} catch (error) {
		console.error(error);
		return res.status(500).json({error: 'Error creating user'});
	}
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

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function deleteUser(request, res) {
	const id = Number.parseInt(request.params.id);

	if (isNaN(id)) {
		return res.status(400).json({error: 'Invalid id'});
	}

	const user = await prisma.user.findUnique({where: {id}});

	if (user === null) {
		return res.status(404).json({error: 'User not found'});
	}

	await prisma.user.delete({where: {id}});
	return res.status(204).send();
}
