import { User } from "./user";

export type AuthContextData = {
  user: User | null
  signInUrl: string,
  signOut: () => void
}