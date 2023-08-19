import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SIGNING_KEY;

export default NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {},
            authorize: async (credentials, req) => {
                const { email, password } = credentials;
                const res = await axios.post("http://localhost:8080/auth/login", {
                    email,
                    password,
                });

                if (res.status === 200 && res.data.token) {
                    const decoded = jwt.verify(res.data.token, secret);
                    const { id, username, email } = decoded.user;
                    return { id, username, email, token: res.data.token };
                } else {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            return { expires: session.expires, user: { ...token } };
        },
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
    },
    secret,
});
