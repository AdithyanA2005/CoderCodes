import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { connectToMongo } from "@/db/client";
import User from "@/db/models/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user: { name, email, image } }) {
      await connectToMongo();
      const existingUser = await User.exists({ email });
      if (!existingUser) await User.create({ name, email, image });
      return true;
    },

    async jwt({ token }) {
      await connectToMongo();
      if (token.email) {
        const user = await User.findOne({ email: token.email }).select("_id");
        token.id = user?._id;
      }
      return token;
    },

    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
