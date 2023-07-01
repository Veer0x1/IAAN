import * as process from "process"
import { db, firestore } from "@/firebase/config"
import { FirestoreAdapter } from "@next-auth/firebase-adapter"
import { SES } from "@aws-sdk/client-ses";
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
import EmailProvider from "next-auth/providers/email"
import LinkedInProvider from "next-auth/providers/linkedin"
import { siteConfig } from "@/config/site"
import { cert } from "firebase-admin/app";
import { ServiceAccount } from 'firebase-admin';
const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-south-1",
}

const ses = new SES(awsConfig)
//  const allkey={
//   type: process.env.TYPE,
//   project_id:process.env.PROJECT_ID,
// private_key_id:process.env.PRIVATE_KEY_ID,
// private_key:process.env.PRIVATE_KEY,
// client_email:process.env.CLIENT_EMAIL,
// client_id:process.env.CLIENT_ID,
// auth_uri:process.env.AUTH_URI,
// token_uri:process.env.TOKEN_URI,
// auth_provider_x509_cert_url:process.env.AUTH_PROVIDER_X509_CERT_URL,
// client_x509_cert_url:process.env.CLIENT_X509_CERT_URL,
// universe_domain:process.env.UNIVERSE_DOMAIN
// }

// const allkey = {
//   type: process.env.TYPE,
//   project_id: process.env.PROJECT_ID,
//   private_key_id: process.env.PRIVATE_KEY_ID,
//   private_key: process.env.PRIVATE_KEY,
//   client_email: process.env.CLIENT_EMAIL,
//   client_id: process.env.CLIENT_ID,
//   auth_uri: process.env.AUTH_URI,
//   token_uri: process.env.TOKEN_URI,
//   auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
//   client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
//   universe_domain: process.env.UNIVERSE_DOMAIN
// };

// const serviceAccount = {
//   type: allkey.type,
//   project_id: allkey.project_id,
//   private_key_id: allkey.private_key_id,
//   private_key: allkey.private_key.replace(/\\n/g, '\n'),
//   client_email: allkey.client_email,
//   client_id: allkey.client_id,
//   auth_uri: allkey.auth_uri,
//   token_uri: allkey.token_uri,
//   auth_provider_x509_cert_url: allkey.auth_provider_x509_cert_url,
//   client_x509_cert_url: allkey.client_x509_cert_url,
// };
const credentials = {
  projectId: process.env.PROJECT_ID || '',
  clientEmail: process.env.CLIENT_EMAIL || '',
  privateKey: process.env.PRIVATE_KEY || '',
};
export const authOptions: NextAuthOptions = {
  // @ts.ignore
  adapter: FirestoreAdapter({
    // @ts-ignore
      credential: cert(credentials)
    }),

  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: parseInt(process.env.EMAIL_SERVER_PORT!),
        secure: true, // Set to true if your server requires a secure connection (e.g., TLS)
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

        if (dbUser) {
          try {
            const params = {
              Source: process.env.EMAIL_FROM,
              Destination: {
                ToAddresses: [identifier],
              },
              Subject: "Sign in to " + siteConfig.name,
              Body: {
                Html: {
                  Charset: "UTF-8",
                  Data: `<h1>Sign in to ${siteConfig.name}</h1>`,
                },
              },
            }

            // @ts-ignore
            const sendEmail = ses.sendEmail(params)
            sendEmail.then((data) => {
              console.log("email submitted to SES", data)
            })
          } catch (error) {
            console.log(error)
          }
        } else {
          throw new Error("User not found")
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
          return "/register/founder"
        }
        return true
      } catch (error) {
        return `/error`
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
          // namekumar:"rahul"
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
