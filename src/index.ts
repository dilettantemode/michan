import express from 'express';
import router from './handler/router';
import config from './config/config';

const app = express();

app.use(express.json());
app.use(router);

app.listen(config.appEnv.port, () => {
  console.log(`Server running on port ${config.appEnv.port}`);
});

