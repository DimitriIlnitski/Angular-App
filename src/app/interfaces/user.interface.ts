import { UserName } from "./user-name.interface";

export interface User {
  id: number;
  token: string;
  name: UserName;
  login: string;
  password: string;
}
