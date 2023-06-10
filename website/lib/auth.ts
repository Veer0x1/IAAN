import { NextAuthOptions } from "next-auth"
import LinkedInProvider from "next-auth/providers/linkedin"

export const authOptions: NextAuthOptions = {
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  // session: {
  //   strategy: "jwt",
  // },
  callbacks: {
    // jwt: async function ({ token, user }) {
    //   // once the user get successfully authenticated this callback will be called and passed token and user object
    //   // this token and user object is sent by the provider
    //   // this token and user object will be passed to session callback
    //   const dbUser = await db.user.findFirst({
    //     where: {
    //       email: token.email,
    //     },
    //   })
    //   // checking if the user is already present in the database
    //   // if not present then we will add the user to the database
    //   if (!dbUser) {
    //     if (user) {
    //       token.id = user?.id
    //     }
    //     return token
    //   }
    //   // if the user is already present in the database then we will update the user details
    //   return {
    //     id: dbUser.id,
    //     name: dbUser.name,
    //     email: dbUser.email,
    //     picture: dbUser.image,
    //   }
    // },
    session: async function ({ token, session }) {
      if (token && session) {
        // @ts-ignore
        session.user.id = token.id
        // @ts-ignore
        session.user.name = token.name
        // @ts-ignore
        session.user.email = token.email
        // @ts-ignore
        session.user.image = token.picture
      }
      return session
    },
  },
}
