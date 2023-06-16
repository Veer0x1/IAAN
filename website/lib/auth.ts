import * as process from "process"
import { db, firestore } from "@/firebase/config"
import { FirestoreAdapter } from "@next-auth/firebase-adapter"
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore"
import { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import LinkedInProvider from "next-auth/providers/linkedin"
import { Client } from "postmark"

import { siteConfig } from "@/config/site"

const postmarkClient = new Client(process.env.POSTMARK_API_TOKEN!)

export const authOptions: NextAuthOptions = {
  adapter: FirestoreAdapter(firestore),

  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        const querySnapshot = await getDocs(
          query(collection(db, "users"), where("email", "==", identifier))
        )
        const dbUser = querySnapshot.docs[0]

        const templateId = dbUser?.data()?.emailVerified
          ? process.env.POSTMARK_SIGN_IN_TEMPLATE
          : process.env.POSTMARK_ACTIVATION_TEMPLATE
        if (!templateId) {
          throw new Error("Missing template id")
        }

        const result = await postmarkClient.sendEmailWithTemplate({
          TemplateId: parseInt(templateId),
          To: identifier,
          From: provider.from as string,
          TemplateModel: {
            action_url: url,
            product_name: siteConfig.name,
            name: dbUser?.data()?.name,
          },
          Headers: [
            {
              // Set this to prevent Gmail from threading emails.
              // See https://stackoverflow.com/questions/23434110/force-emails-not-to-be-grouped-into-conversations/25435722.
              Name: "X-Entity-Ref-ID",
              Value: new Date().getTime() + "",
            },
          ],
        })

        if (result.ErrorCode) {
          throw new Error(result.Message)
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async function ({ token, user }) {
      // once the user get successfully authenticated this callback will be called and passed token and user object
      // this token and user object is sent by the provider
      // this token and user object will be passed to session callback

      const querySnapshot = await getDocs(
        query(collection(db, "users"), where("email", "==", token.email))
      )
      const dbUser = querySnapshot.docs[0]
      // checking if the user is already present in the database
      // if not present then we will add the user to the database
      if (!dbUser.exists()) {
        addDoc(collection(db, "users"), {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          emailVerified: true,
        })

        if (user) {
          token.id = user?.id
        }
        return token
      }
      return token
    },
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
    redirect: async ({ url, baseUrl }) => {
      return baseUrl
    },
  },
}
