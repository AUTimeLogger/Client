import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "aut-time-logger",
      name: "credentials",
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "claire" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/access/login`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          }
        );

        const result = await res.json();
        const user = result.token;

        return user ?? null;
      },
    }),
  ],
  callbacks: {
    jwt: async (token) => {
      return Promise.resolve(token);
    },
    async session(req) {
      return {
        ...req.session,
        autToken: req.token.token.user,
      };
    },
  },
};

export default NextAuth(authOptions);
