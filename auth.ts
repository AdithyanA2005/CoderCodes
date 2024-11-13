import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { client } from "@/sanity/lib/client";
import { USER_BY_GOOGLE_EMAIL_QUERY, USER_BY_GOOGLE_ID_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user: { id, name, email, image } }) {
      const existingUser = await client.withConfig({ useCdn: false }).fetch(USER_BY_GOOGLE_ID_QUERY, { id });
      if (!existingUser) await writeClient.create({ _type: "author", id, name, email, image });
      return true;
    },

    async jwt({ token }) {
      if (token.email) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(USER_BY_GOOGLE_EMAIL_QUERY, { email: token.email });
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
