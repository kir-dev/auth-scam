export interface ProfileData {
  sub: string;
  name: string;
  family_name: string;
  given_name: string;
  email?: string;
}

export class Profile {
  readonly data: ProfileData;

  constructor({ sub, name, family_name, given_name, email }: ProfileData) {
    this.data = {
      sub,
      name,
      family_name,
      given_name,
      email: email || sub + '@example.com',
    };
  }

  serialize() {
    return btoa(JSON.stringify(this.data));
  }

  static fromString(str: string) {
    return new Profile(JSON.parse(atob(str)));
  }
}
