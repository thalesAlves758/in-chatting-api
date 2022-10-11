import app from './app';
import dotenv from 'dotenv';
import http from 'http';
import { initIo } from './io';

dotenv.config();

const server = http.createServer(app);

const port = process.env.PORT ?? 5000; /* eslint-disable-line */

initIo(server);

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
