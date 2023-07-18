# IAAN
IIT BHU Alumni Angel Network is a initiative by E-Cell IIT BHU to help startups. The network will help startups in getting funding, mentoring and other support from IIT BHU Alumni.


## Technologies Used

- TypeScript
- Next.js 13 App directory
- NextAuth.js
- Firebase ( Storage and Firestore)
- Shadcn UI
- React Hook Form
- Zod 
- Radix UI Primitives 
- Tailwind CSS 
- Icons from Lucide 
- Dark mode with next-themes 
- Tailwind CSS class sorting, merging and linting.

## Setup Locally

```bash
git clone https://github.com/ecelliitbhu/IAAN.git
```
```bash
cd website
```
```bash
pnpm install
```
if you dont have pnpm installed then install it using
```bash
npm install -g pnpm
```
```bash
pnpm dev
```
Create a .env.local file in the root of website directory and add variables
```bash
LINKEDIN_CLIENT_ID
LINKEDIN_CLIENT_SECRET

NEXTAUTH_URL
NEXTAUTH_SECRET

FIREBASE_API_KEY
FIREBASE_PROJECT_ID
FIREBASE_STORAGE_BUCKET
FIREBASE_MESSAGING_SENDER_ID
FIREBASE_APP_ID
FIREBASE_MEASUREMENT_ID

FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY
```
To get the values of these variables you need to create a firebase project and a linkedin app. For firebase you need to create a service account and get the private key and client email. For linkedin you need to create a app and get the client id and client secret.

Adding UI components with [Shadcn UI](https://ui.shadcn.com/docs/changelog)
```bash
pnpm dlx shadcn-ui@latest add
```
