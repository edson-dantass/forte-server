import fastify from 'fastify';
import { registerUserController } from './infra/controllers/register-user-controller';

const server = fastify();

server.post('/user', registerUserController);

const start = async () => {
  try {
    await server.listen({ port: 3000 });
    console.log('Server is running on http://localhost:3000');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();