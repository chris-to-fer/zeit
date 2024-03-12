import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import GithubProvider from "next-auth/providers/github";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../db/mongoClient.js";
import connectDB from "@/app/db/connectDB.js";
import User from "@/app/db/model/User.js";
import bcrypt from "bcrypt";

// export async function auth(req, res) {
// Do whatever you want here, before the request is passed down to `NextAuth`
//this is next auth docu with me filling in provider and github
export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    GithubProvider({
      id: "github",
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      //You can add properties to the user object in the database by adding a profile function to your provider object, like this:
      // profile(profile) {
      //   return {
      //     id: profile.id,
      //     // This ID is required but it will not be saved in your users collection
      //     name: profile.name,
      //     email: profile.email,
      //     image: profile.avatar_url,

      //     // You can add any other properties you want to the user object
      //     admin: false,
      //     //       preferedColors: ["#dddddd", "#ffffff"],
      //   };
      // },
    }),
    GoogleProvider({
      id: "google",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectDB();
          const user = await User.findOne({ email });
          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) {
            console.log("password wrong");
            return null;
          }
          return user;
        } catch (error) {
          console.log("Error", error);
        }
      },
    }),
    // ...add more providers here
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      // The user object from the database contains the ID of the user in your database
      // session.user.uid = token.uid;
      session.user.userId = token.id;
      // With the code above you can add the user ID to the session object and use it in your pages
      // Make sure you console.log the session and user objects to see what they contain

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/",
  },
};
// }

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

/* for api:
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"


export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  return res.json({
    message: 'Success',
  })
}
*/
