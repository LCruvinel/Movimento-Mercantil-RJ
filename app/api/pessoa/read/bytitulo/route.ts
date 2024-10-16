import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const result = await prisma.pessoa.findMany({
    where: {
      id_titulo_nobreza: Number(id),
    },
    select: {
      id: true,
      nome: true,
      pais: true,
    },
  });
  return Response.json(result);
}
