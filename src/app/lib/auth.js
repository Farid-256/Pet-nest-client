
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { betterAuth } from "better-auth"  
console.log(process.env.MONGODB_URI)

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('adopMe');

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENTID,
            clientSecret: process.env.CLIENT_SECRET
        }
    },
    session: {
        cookieCache: {
            enabled: true,
            strategy: 'jwt',
            maxAge: 60 * 60 * 24 * 30
        }
    },
    plugins: [
        jwt()
    ]
})