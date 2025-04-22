import { SQLOutputValue } from "node:sqlite";

export interface UserInterface {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}
