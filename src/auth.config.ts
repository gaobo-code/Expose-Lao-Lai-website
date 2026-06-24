import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/apple/ln",
  },
  session: {
    strategy: 'jwt',  // Using JWT session strategy
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      if (isLoggedIn) return true;
      return false; // Redirect unauthenticated users to ln page
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    }
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
