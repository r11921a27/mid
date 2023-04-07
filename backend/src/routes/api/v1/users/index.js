import {Router} from 'express';
import {getAllUsers} from './handlers.js';

const router = Router();
router.get('/', getAllUsers);
export default router;
