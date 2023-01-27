import nextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import Users from "@/database/model/user";
import { compare } from "bcrypt";
import connectMongo from "@/database/connection";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        connectMongo().catch((err) => {
          err: "Credentials Failed";
        });

        const result = await Users.findOne({ email: credentials.email });

        if (!result) {
          throw new Error("No user Found with that email, Please Register");
        }

        const checkPassword = await compare(
          credentials.password,
          result.password
        );

        //  check password uniqueness
        if (!checkPassword || result.email !== credentials.email) {
          throw new Error("Password or Username mismatch");
        }

        return result;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login"
    
  },
  session: {
    strategy:"jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
export default nextAuth(authOptions);
