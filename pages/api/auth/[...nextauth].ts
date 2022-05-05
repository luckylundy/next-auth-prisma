import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  //新規作成したprismaクライアントをどこでも呼び出せるグローバル変数として定義
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

//アダプターやプロバイダーを指定
const options = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      console.log(user);
      //sessionの情報にsession.user.idを追加する
      session.user.id = user.id;
      return Promise.resolve(session);
      console.log(session);
    },
  },
  secret: "secret",
};

export default (req, res) => NextAuth(req, res, options);
