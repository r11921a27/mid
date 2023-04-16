import {prisma} from '../../../../adapters.js';

export async function getMessage(request, res) {
	const messages = await prisma.messages.findMany({
		include: {user: true},
	});
	return res.status(200).json(messages);
}

export async function postMessage(request, res) {
	const {name, password, message} = request.body;
	const user = await prisma.user.findUnique({where: {name}});
	if (!user || user.hashed_password !== password) {
		return res.status(401).json({error: 'Invalid username or password'});
	}

	const newMessage = await prisma.messages.create({
		data: {messages: message, user: {connect: {id: user.id}}},
		include: {user: true},
	});
	return res.status(200).json(newMessage);
}

export async function deleteMessage(request, res) {
	const {name, password, messageId} = request.body;
	const user = await prisma.user.findUnique({where: {name}});
	if (!user || user.hashed_password !== password) {
		return res.status(401).json({error: 'Invalid username or password'});
	}

	const message = await prisma.messages.findUnique({
		where: {id: messageId},
		include: {user: true},
	});
	if (!message || message.user_id !== user.id) {
		return res.status(404).json({error: 'Message not found'});
	}

	await prisma.messages.delete({where: {id: messageId}});
	return res.status(200).json(message);
}
