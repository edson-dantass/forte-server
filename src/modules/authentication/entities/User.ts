// export class User {
//   id: string;
//   name: string;
//   email: string;
//   password: string;

//   constructor(id: string, name: string, email: string, password: string) {
//     this.id = id;
//     this.name = name;
//     this.email = email;
//     this.password = password;
//   }
// }

// conceitos da programação orientada a objetos
export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string
  ) {}
}
