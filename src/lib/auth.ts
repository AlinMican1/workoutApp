
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session:{
        strategy: 'jwt'
    },
    pages:{
        signIn: '/login',
    },
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "email", type: "email", placeholder: "Email" },
            password: { label: "Password", type: "password" }
          },
          
          async authorize(credentials) {
            if(!credentials?.email || !credentials?.password){
                return null;
            }
            const userExist = await db.user.findUnique({
                where: {email: credentials?.email }
            });
            
            if(!userExist){
                return null;
            }

            const passwordMatch = await compare(credentials.password, userExist.password);
            
            if(!passwordMatch){
                return null;
            }

            return {
                id: userExist.id,
                username: userExist.username,
                email: userExist.email,
            }
            }
          })
        
      ],
      callbacks:{
        async jwt({token, user}){
            //console.log(token, user)
            if(user){
                return{
                    ...token,
                    username: user.username
                }
            }
            return token;
        },
        async session({session,token}){
            return{
                ...session,
                user:{
                    ...session.user,
                    username: token.username
                }
            }
            
        },
      }
}

