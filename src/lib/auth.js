import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import { getServerSession } from "next-auth";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    SignIn: "/sign-in",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    //Whenver Jwt is created or updated, this function runs
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
          select: {
            id: true,
            name: true,
            email: true,
            username: true,
            image: true,
            role: true,
          },
        });

        if (dbUser) {
          (token.id = dbUser.id),
            (token.name = dbUser.name),
            (token.email = dbUser.email);
          (token.username = dbUser.username),
            (token.image = dbUser.image),
            (token.role = dbUser.role);
        } else {
          const newUser = await prisma.user.create({
            data: {
              email: user.email,
              username: user.username,
              image: user.image,
              role: "user",
            },
          });
          token.id = newUser.id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.role = token.role;
      }
      return session;
    },
    redirect() {
      return "/dashboard";
    },
  },
};

export function getAuthSession() {
  return getServerSession(authOptions);
}
