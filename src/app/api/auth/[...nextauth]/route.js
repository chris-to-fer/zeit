import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import GithubProvider from "next-auth/providers/github";
import { AuthOptions } from "next-auth";

import clientPromise from "../../../db/mongoClient.js";

// export async function auth(req, res) {
// Do whatever you want here, before the request is passed down to `NextAuth`
//this is next auth docu with me filling in provider and github
export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    GithubProvider({
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

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
