import prisma from '@/lib/prisma';

export async function GET() {
  const result = await prisma.unidade_de_medida.findMany({
    select: {
      id: true,
      unidade_medida: true,
    },
  });
  return Response.json(result);
}
