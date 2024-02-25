import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import axios from "axios";

const secret = process.env.JWT_SIGNING_KEY;
const serverBaseUrl = process.env.SERVER_URL || "http://stockfeeler.online:8080";

export const authOptions = {
    providers: [
        Credentials({
            name: "credentials",
            credentials: {},
            authorize: async (credentials, req) => {
                const { username, password } = credentials;
                const signInResponse = await axios.post(`${serverBaseUrl}/auth/login`, {
                    username,
                    password,
                });

                if (signInResponse.status === 200 && signInResponse.data.token) {
                    const decoded = jwt.verify(signInResponse.data.token, secret);
                    const { id, username } = decoded.user;
                    const user = { id, username, token: signInResponse.data.token };

                    return user;
                } else {
                    return null;
                    
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token }) {
            return { expires: session.expires, user: { ...token } };
        },
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
    },
    secret,
    pages: {
        signIn: "/login"
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
