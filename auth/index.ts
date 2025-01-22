import type { NextAuthOptions, Session, User } from "next-auth";

import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

import { ILoginPayload } from "@/src/types/api";
import { POSTLogin } from "@/src/utils/api";

export const options: NextAuthOptions = {
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token = { ...token, ...user };
      }
      return token;
    },

    async redirect({ baseUrl }) {
      return baseUrl;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user = { ...session.user, ...token };
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials: Record<never, string> | undefined): Promise<null | User> {
        if (!credentials) {
          return null;
        }

        try {
          const { identifier, password } = credentials as ILoginPayload;

          const res = await POSTLogin({ identifier, password });

          if (!res) {
            return null;
          }

          const mapDataToResponse: User = {
            ...res,
            id: res.id.toString(),
          };

          return mapDataToResponse;
        } catch {
          return null;
        }
      },
      credentials: {},
      name: "Credentials",
    }),
  ],

  session: {
    maxAge: 60 * 60 * 24,
    strategy: "jwt",
  },
};
