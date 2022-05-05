import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();
type Data = {
  title: string;
  body: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //リクエストを引数に入れ、sessionを返す
  const session = await getSession({ req });
  if (!session) return res.status(401).end("Please log in to view");

  const userId = session.user.id;

  if (req.method === "GET") {
    const todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        userId,
      },
    });
    return res.status(200).json(todos);
  }

  if (req.method === "POST") {
    //todoを作成した時のreq.bodyをJSONにしてtitle,bodyに代入
    const { title, body } = JSON.parse(req.body) as Data;

    const createdTodo = await prisma.todo.create({
      data: {
        title,
        body,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    res.status(201).json(createdTodo);
  }
};
