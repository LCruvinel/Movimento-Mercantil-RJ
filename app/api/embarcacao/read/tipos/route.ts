import { validateRequest } from "@/auth";
import prism from "@/lib/prisma";

export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");

  const result = await prism.tipo_embarcacao.findMany({
    select: {
      id: true,
      texto_descritivo: true,
      tipo: true,
      imagem_embarcacao: {
        select: {
          id: true,
          imagem: true,
        },
      },
    },
    take: 10,
    skip: page ? 10 * (+page - 1) : 0,
  });
  return Response.json(result);
}
