export class VerificationCode {
  constructor(
    public id: string,
    public sender_email: string,
    public is_verificated: boolean,
    public created_at: Date,
    public userId: string
  ) {}
}
