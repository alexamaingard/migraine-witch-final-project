import { Router } from 'express';

import { authenticateUser, createUser } from '../controllers/user'

const router = Router();

router.post('/register', createUser);
router.post('/login', authenticateUser);

export default router;