import bcrypt from 'bcrypt';
import {prisma} from '../../../../adapters.js';

export async function signIn(request, res) {
	const {name, password} = request.body;

	const user = await prisma.user.findUnique({
		where: {name},
	});

	if (!user) {
		return res.status(404).json({error: 'User not found'});
	}

	const isPasswordValid = await bcrypt.compare(password, user.hashed_password);

	if (!isPasswordValid) {
		return res.status(401).json({error: 'Invalid password'});
	}

	// Request.session.userId = user.id;

	return res.status(200).json({success: true});
}

export async function signOut(request, res) {
	req.session.destroy();
	return res.status(200).json({success: true});
}
