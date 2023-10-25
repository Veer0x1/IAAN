import * as process from "process"
import { db, firestore } from "@/firebase/config"
import { FirestoreAdapter } from "@next-auth/firebase-adapter"
import { cert } from "firebase-admin/app"
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore"
import { NextAuthOptions } from "next-auth"
import LinkedInProvider from "next-auth/providers/linkedin"
// import {toast} from "@/components/ui/use-toast";

export const authOptions: NextAuthOptions = {
  // @ts.ignore
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    }),
  }),

  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    signIn: async function ({ user }) {
      try {
        let email = user?.email
        let photo = user?.image

        const querySnapshot1 = await getDocs(
          query(collection(db, "founders"), where("email", "==", email))
        )
        const querySnapshot2 = await getDocs(
          query(collection(db, "investors"), where("email", "==", email))
        )
        const doc1 = querySnapshot1.docs[0]
        const doc2 = querySnapshot2.docs[0]
        if (!querySnapshot1.empty) {
          const docRef = doc(db, "founders", doc1.id)
          await updateDoc(docRef, { image: photo })
        }
        if (!querySnapshot2.empty) {
          const docRef = doc(db, "investors", doc2.id)
          await updateDoc(docRef, { image: photo })
        }
        if (querySnapshot1.empty && querySnapshot2.empty) {
          // toast({title: "Upload is paused"})
          return "/join_us"
        }
        return true
      } catch (error) {
        return `/${error}`
      }
    },

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
    redirect: async ({ baseUrl }) => {
      return baseUrl
    },
  },
}
