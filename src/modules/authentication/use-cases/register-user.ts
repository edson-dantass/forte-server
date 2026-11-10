import type { User } from "../entities/User";
import type { UserRepository } from "../repositories/user-repository";

export class RegisterUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: User) {
    const userWithEmail = await this.userRepository.findByEmail(data.email);
    if (userWithEmail) {
      throw new Error("User with this email already exists");
    }
    await this.userRepository.create(data);
  }
}
