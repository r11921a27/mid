import {Router} from 'express';
import {getAllUsers, getOneUser, createOneUser, deleteUser} from './handlers.js';

const router = Router();
router.get('/', getAllUsers);
router.get('/:id', getOneUser);
router.post('/', createOneUser);
router.delete('/:id', deleteUser);
export default router;
