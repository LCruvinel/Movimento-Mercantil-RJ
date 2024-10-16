import { validateRequest } from "@/auth";
import prism from "@/lib/prisma";

export const dynamic = "force-dynamic";
export async function GET() {
  const { user } = await validateRequest();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

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
  });
  return Response.json(result);
}
