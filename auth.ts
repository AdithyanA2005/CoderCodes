import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { client } from "@/sanity/lib/client";
import { USER_BY_GOOGLE_EMAIL_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user: { name, email, image } }) {
      const existingUser = await client.withConfig({ useCdn: false }).fetch(USER_BY_GOOGLE_EMAIL_QUERY, { email });
      if (!existingUser) await writeClient.create({ _type: "user", name, email, image });
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
