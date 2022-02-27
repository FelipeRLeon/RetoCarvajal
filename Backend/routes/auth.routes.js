import express from 'express';
import authentication from '../controllers/auth';

const router = express.Router();

router.post('/signup', authentication.signUp);

router.post('/signIn', authentication.signIn);

module.exports = router;