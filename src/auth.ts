import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { upsertUser } from "./lib/actions/payload";
import { getPayloadClient } from "./lib/payload-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user: { name, email, image } }) {
      upsertUser({
        email: email!,
        name: name!,
        image: image!,
      });
      return true;
    },

    async jwt({ token }) {
      const payload = await getPayloadClient();
      if (token.email) {
        const user = (
          await payload.find({
            collection: "users",
            where: { email: { equals: token.email } },
          })
        ).docs[0];

        if (user) token.id = user.id;
      }

      return token;
    },

    async session({ session, token }) {
      Object.assign(session.user, { id: token.id });
      return session;
    },
  },
});
