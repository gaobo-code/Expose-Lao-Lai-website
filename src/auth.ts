import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import bcrypt from 'bcrypt';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {

        const { username, password, secretName, secretPass, code } = credentials as {
          username: string;
          password: string;
          secretName: string;
          secretPass: string;
          code: string;
        };

        const userMatch = await bcrypt.compare(username, process.env.LOGIN_USERNAME!);
        const passwordMatch = await bcrypt.compare(password, process.env.LOGIN_PASSWORD!);

        if (!userMatch || !passwordMatch) return null;

        let res;
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);

        try {
          res = await fetch('http://localhost:9766/football', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              coca: secretName,
              sugar: secretPass
            }),
            signal: controller.signal,
            cache: 'no-store', // important for mutations
          });

        } catch (e) {
          return null;
        } finally {
          clearTimeout(timeout);
        }

        if (!res.ok) return null;

        const data = await res.json();

        if (data.code !== 200) return null;
        if (data.message !== code) return null;

        return {
          id: "1",
          name: "gaobo_code",
        };
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET
});