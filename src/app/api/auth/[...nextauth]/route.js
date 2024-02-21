import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import clientPromise from "../../../lib/mongodb";
import GithubProvider from "next-auth/providers/github";

import clientPromise from "../../../db/mongoClient.js";

//short version from medium for app router: https://medium.com/@rohitkumarkhatri/next-auth-in-app-router-of-next-js-7df037f7a2ad
// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

// export async function auth(req, res) {
// Do whatever you want here, before the request is passed down to `NextAuth`
//this is next auth docu with me filling in provider and github
export const OPTIONS = {
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      //You can add properties to the user object in the database by adding a profile function to your provider object, like this:
      //   profile(profile) {
      //     return {
      //       id: profile.id,
      //       // This ID is required but it will not be saved in your users collection
      //       name: profile.name,
      //       email: profile.email,
      //       image: profile.avatar_url,

      //       // You can add any other properties you want to the user object
      //       admin: false,
      //       preferedColors: ["#dddddd", "#ffffff"],
      //     };
      //   },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, user }) {
      // The user object from the database contains the ID of the user in your database

      session.user.userId = user.id;

      // With the code above you can add the user ID to the session object and use it in your pages

      // Make sure you console.log the session and user objects to see what they contain

      return session;
    },
  },
  secret: process.env.JWT_SECRET,
};
// }

export const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };

//marcell:
// const authOptions = {
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//You can add properties to the user object in the database by adding a profile function to your provider object, like this:
//   profile(profile) {
//     return {
//       id: profile.id,
//       // This ID is required but it will not be saved in your users collection
//       name: profile.name,
//       email: profile.email,
//       image: profile.avatar_url,

//       // You can add any other properties you want to the user object
//       admin: false,
//       preferedColors: ["#dddddd", "#ffffff"],
//     };
//   },
//     }),
//   ],
//   adapter: MongoDBAdapter(clientPromise),
//   callbacks: {
//     async session({ session, user }) {
//       // The user object from the database contains the ID of the user in your database

//       session.user.userId = user.id;

//       // With the code above you can add the user ID to the session object and use it in your pages

//       // Make sure you console.log the session and user objects to see what they contain

//       return session;
//     },
//   },

//   };

// export  NextAuth(authOptions);

/*Jan::
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongoose";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
};
export default NextAuth(authOptions);
*/

/* documentation nextauth:

import type { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"

export default async function auth(req: NextApiRequest, res: NextApiResponse) {

  if(req.query.nextauth.includes("callback") && req.method === "POST") {
    console.log(
      "Handling callback request from my Identity Provider",
      req.body
    )
  }

  // Get a custom cookie value from the request
  const someCookie = req.cookies["some-custom-cookie"]

  return await NextAuth(req, res, {
    ...
    callbacks: {
      session({ session, token }) {
        // Return a cookie value as part of the session
        // This is read when `req.query.nextauth.includes("session") && req.method === "GET"`
        session.someCookie = someCookie
        return session
      }
    }
  })
}

*/
/*
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

export default async function auth(req, res) {
  const providers = [
    CredentialsProvider(...),
    GoogleProvider(...),
  ]

  const isDefaultSigninPage = req.method === "GET" && req.query.nextauth.includes("signin")

  // Will hide the `GoogleProvider` when you visit `/api/auth/signin`
  if (isDefaultSigninPage) providers.pop()

  return await NextAuth(req, res, {
    providers,
    ...
  })
}
 */
