import { eq } from "drizzle-orm";
import { db } from "../..";
import type { UserRepository } from "../../../../modules/authentication/repositories/user-repository";
import { usersTable } from "../../schema";

export class DrizzleUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<unknown | null> {
   const user = await db.select().from(usersTable).where(eq(usersTable.email, email)).execute();

   return user.length > 0 ? user[0] : null;
  }

  async create(user: unknown): Promise<void> {
    await db.insert(usersTable).values(user as any).execute();
  }
}