import prisma from '@/lib/prisma';

export async function GET() {
  const result = await prisma.pessoa.findMany({

    select: {
      id: true,
      nome: true,
      relacao_embarcacao_proprietario: {
        select: {
          embarcacao: {
            select: {
              nome: true,
            },
          },
        },
      },
    },
  });

  return Response.json(result);
}
