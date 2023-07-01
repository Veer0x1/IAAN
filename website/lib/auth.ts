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
const serviceAccount = {
  type: 'service_account',
  project_id: "iaan-4a273",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCvI2f3ahBUt94X\nsLdAGv6ZEMUAHkdU0I1upifcjDNFwNw+X1cEixJouvG/rHA3+USCCix7IEkspPaM\nQXQJNXgv94E75qt0SHqpUW9eYdl6ma3hj5v6i2DhmxwNA3Hkd5IjwUQ0eBuGzyxy\nfb1BBl6t+d4aWAXBksoRtytO/eXxaeb6xwgZ79yUSikkh2mNHY+XTPowpLKo4qE3\n+FECarg0U4xCHWzTR4mF3oL29cVxTlaszqZmD/sKu12a3BE8viHH8wRSJ/zvB4DG\nYey0vn/sqwTk5poTtDX0dSzv1IMag6E5jlcAEf2djfSMoeRKTYWesUE9AiReq6UW\nROkO8waZAgMBAAECggEAG6o32sb0B/HYYP0e4T8yXtrdh4iA44ajBKq16rpxwe+2\nSpr0S6ktMgJvvAOA4XKcTf9N6fAeZvEy6dJQAkFiOA98aEomZLKrP5I3yZyixiE+\n7H2rGZ9JITIHcw3LgJebq860V6ZuULPqlTZD/iDDtW8eFKK5XAu0JCq/KlXka+b3\n8UYmHOe6S1rqGvsZpHdAi5qUshhMolY9Y8f02CqhKLJ1XATRd9SI+cK3UlcVcq/A\nQu0d67aq/LwA/B+34Yq2GtW4pIc83snDPcNpFsnQe0dX8nkb0sejcTf4vlRsfBV1\n9Kr1/87QhXVhfx2Xwh+G8LPLpoi0OmDTP4f9DbMARQKBgQDa1NXRNMehK9XhqX1F\nQ+yCoAa32lD19bF2xPt31Mm5WGnekZDbYJ4Kq3L9xfbPMYOpYC3RKfY7i8XCCcY/\nZ9G5Nyg5W8DC2R4GItgL13hPoaXqiKpTfAyx0WPWBSxggQRIMrL0914FxsSErPtJ\nL+K6mYPoQX8/vyJ36PDEe2OLNQKBgQDM4rh4dNR4YzNJUb/lcrU4ZLpMYprp5ReK\nghan88hLS1N5PXskCYuooBq9wFCUKuc4up6Mn1qmepa60JPxd0j9a5LAX1Mn3Bev\nL+iYA6Mmfe3CbC8pftI/mR6bhpfePH5KJJoLhPbaCkM1oxmOIjsKOL/p0vDf6Qj6\nhf6cD9pWVQKBgAu6DBtB8NC6QKPvKT9k/G+jk7iWgnAr0m7C75bkWEsOad37fv/C\nlbWMqoTe7vL7fEq/VLU4wnE+dEKJs44CSkLaqdUpDZNjfzBk/Z7k1RWvW+zNlhMT\nOrrstaTqcg5Z25ji3qQx/V/h3vYdLvolDslhIKh5mhAYdghm+0AMPLFhAoGAZUgK\nYtl2EtEPEEaOMxGiTe9VPN9drxPlsD2gj4PuVnI1IHDpB6aEWGZU8co4yxXuWVe/\nespnmHZvPohPKgWKmmPsFpbI16JwPtTTCRp7M1L7DqpGIiAkNPYvcDh3qI+E6ofv\ncpRXJu/9y20F/AIl52aoUCFLm5RqMNW+SE155EUCgYEApiRv6KydbKJUoTOAkgG/\nKTRgLFPLXFmZ3YxvcBwQl3CmxrWX0DOV4LLMePAopYNhi37wEG9a2/T3KH9kBg2K\nQwLjoLd2Tjw9aSLGjsyi4RTYJhkQW82xowszeNTYOZC3W9+Y65pBlQgn9qac4mEG\ncTefLLdwyYXLtHwa9pRgbSQ=\n-----END PRIVATE KEY-----\n",
  private_key_id: "bb4a8b093c51639bf022c0bc83fc337b52317a81",
  client_email:  "firebase-adminsdk-pv38g@iaan-4a273.iam.gserviceaccount.com",
  client_id: "102148604487505023129",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url:  "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-pv38g%40iaan-4a273.iam.gserviceaccount.com",
};
// @ts-ignore
const credential = cert(serviceAccount);
export const authOptions: NextAuthOptions = {

  adapter: FirestoreAdapter({

      credential:credential
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
