import prisma from "@/lib/prisma";

export async function POST (req: Request){
    const {id_embarcacao,id_porto_origem,id_porto_destino,data_viagem,dias_porto_destino,dias_porto_origem,mestre_id,capitao_id,comandante_id,entrada_sahida,dias_viagem,data_chegada,data_rio,armador_id,tripulacao,total_passageiros} = await req.json()
    const result = await prisma.viagem.create({
        data: {
            id_embarcacao:id_embarcacao,
            id_porto_destino:id_porto_destino,
            data_viagem:data_viagem,
            dias_porto_destino:dias_porto_destino,
            dias_porto_origem:dias_porto_origem,
            entrada_sahida:entrada_sahida,
            dias_viagem:dias_viagem,
            data_chegada:data_chegada,
            data_rio:data_rio,
            tripulacao:tripulacao,
            total_passageiros:total_passageiros,
            embarcacao:{
                connect:{
                    id: id_embarcacao
                }
            },
            porto:{
                connect:{
                    id: id_porto_origem
                }
            },
            mestre:{
                connect:{
                    id: mestre_id
                }
            },
            capitao:{
                connect:{
                    id: capitao_id
                }
            },
            comandante:{
                connect:{
                    id: comandante_id
            }},
            armador:{
                connect:{
                    id: armador_id
                }
            },
        }
    })
    return result
}