import prisma from '@/lib/prisma';

export async function GET() {
  const result = await prisma.tipo_embarcacao.findMany({
    select: {
      id: true,
      tipo: true,
    },
  });
  return Response.json(result);
}
