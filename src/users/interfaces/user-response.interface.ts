export interface UserResponseInterface {
  readonly user: {
    readonly email: string;
    readonly token: string;
    readonly username: string;
    readonly bio: string;
    readonly image: string;
  };
}
