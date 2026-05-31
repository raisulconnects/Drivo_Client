import { createAuthClient } from "better-auth/react";

const client = createAuthClient({
  baseURL: "http://localhost:3000",
});

export const { signIn, signUp, useSession } = client;
export const authClient = client;
