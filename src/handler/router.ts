import express from 'express';
import { receiveWebhook } from './github';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('ok');
});

router.get('/health', (req, res) => {
  res.send('ok');
});

router.get('/github/webhook', receiveWebhook);
router.post('/github/webhook', receiveWebhook);

export default router;

