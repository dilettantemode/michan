import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('ok');
});

router.get('/health', (req, res) => {
  res.send('ok');
});

export default router;

