export class UserCredentials {
  UserName: string;
  PassWord: string;

  constructor(UserName: string, PassWord: string) {
    this.UserName = UserName;
    this.PassWord = PassWord;
  }

  static readonly EMPTY: UserCredentials = {UserName: '', PassWord: ''};
}
