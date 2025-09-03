import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { upsertUser } from './lib/actions/payload'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user: { name, email, image } }) {
      upsertUser({
        email: email!,
        name: name!,
        image: image!,
      })
      return true
    },

    async jwt({ token }) {
      // if (token.email) {
      //   const user = await User.findOne({ email: token.email }).select("_id");
      //   token.id = user?._id;
      // }
      return token
    },

    async session({ session, token }) {
      // Object.assign(session, { id: token.id });
      return session
    },
  },
})
