import prisma from "@/lib/prisma";

export async function UPDATE(req: Request) {
  const {
    id,
    id_viagem,
    id_porto,
    data_escala,
    ano,
    dias_porto,
    entrada_de_passageiros,
    saida_de_passageiros,
  } = await req.json();
  const result = await prisma.escala.update({
    where: {
      id: Number(id),
    },
    data: {
      viagem: {
        connect: {
          id: id_viagem,
        },
      },
      porto: {
        connect: {
          id: id_porto,
        },
      },
      data_escala: data_escala,
      ano: ano,
      dias_porto: dias_porto,
      entrada_de_passageiros: entrada_de_passageiros,
      saida_de_passageiros: saida_de_passageiros,
    },
  });
  return Response.json(result);
}
