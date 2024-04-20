import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const nome = searchParams.get('nome');

  const result = await prisma.porto.findMany({
    where: {
      nome: {
        startsWith: nome?.toString(),
        mode: 'insensitive',
      },
    },
    select: {
      id: true,
      nome: true,
      pais: true,
    },
    take: 10,
  });
  return Response.json(result);
}
