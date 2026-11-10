import type { User } from "../entities/User";


export interface UserRepository {
  findByEmail(email: string): Promise<unknown | null>;
  create(user: User): Promise<void>;
}