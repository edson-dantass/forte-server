import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { RegisterUser } from "../../modules/authentication/use-cases/register-user";
import { DrizzleUserRepository } from "../database/repositories/drizzle/drizzle-user-repository";
import { User } from "../../modules/authentication/entities/User";
import brcrypt from "bcryptjs";

const userSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export async function registerUserController(req: FastifyRequest, res: FastifyReply) {
  try {
    const userData = userSchema.parse(req.body);

    const useCase = new RegisterUser(new DrizzleUserRepository());

    const user = new User(
      userData.name,
      userData.email,
      await brcrypt.hash(userData.password, 10)
    );

    await useCase.execute(user);
    
  } catch (error) {
    if(error instanceof z.ZodError) {
      return res.status(400).send({
        error: "Validation error",
        fields: z.flattenError(error).fieldErrors,
      });
    }
    // enviar para o Sentry ou outro serviço de monitoramento de erros

    // fetch("https://sentry.io/api/1234567890/store/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": "Bearer YOUR_SENTRY_AUTH_TOKEN",
    //   },
    //   body: JSON.stringify({
    //     message: error.message,
    //     stack: error.stack,
    //     timestamp: new Date().toISOString(),
    //   }),
    // });

    console.log(error);
    
    
    return res.status(500).send({ error: "Internal server error" });
   }
}