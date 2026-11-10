import fastify from 'fastify';
import { registerUserController } from './infra/controllers/register-user-controller';

const server = fastify();


server.post('/user', registerUserController);

server.get('/hello', async (request, reply) => {
  return { message: 'Hello, World!' };
});
const port = Number(process.env.PORT) || 3000

const start = async () => {
  try {
    await server.listen({ port: port, host: '0.0.0.0' });
    console.log(`Server is running on http://localhost:${port}` );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();