/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["firebase-admin","@next-auth","@aws-sdk/client-ses"]
  },
  images: {
    domains: ["images.unsplash.com","media.licdn.com","firebasestorage.googleapis.com"],
  },
  env: {
    LINKEDIN_CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET,
    LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,

    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    POSTMARK_API_TOKEN: process.env.POSTMARK_API_TOKEN,
    SMTP_FROM: process.env.SMTP_FROM,
    POSTMARK_SIGN_IN_TEMPLATE:process.env.POSTMARK_SIGN_IN_TEMPLATE,
    POSTMARK_ACTIVATION_TEMPLATE:process.env.POSTMARK_ACTIVATION_TEMPLATE,

    EMAIL_SERVER_USER:process.env.EMAIL_SERVER_USER,
    EMAIL_SERVER_PASSWORD:process.env.EMAIL_SERVER_PASSWORD,
    EMAIL_SERVER_HOST:process.env.EMAIL_SERVER_HOST,
    EMAIL_SERVER_PORT:process.env.EMAIL_SERVER_PORT,
    EMAIL_FROM:process.env.EMAIL_FROM,

    // GOOGLE_APPLICATION_CREDENTIALS:process.env.GOOGLE_APPLICATION_CREDENTIALS,

  },
}

export default nextConfig
