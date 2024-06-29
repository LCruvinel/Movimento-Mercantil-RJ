import prisma from '@/lib/prisma';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import PessoasTable from '../_components/pessoastable';
import ViagensTable from '../_components/viagenstable';

async function getData(id: string) {
  const res = await prisma.embarcacao.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      tipo_embarcacao: {
        include: {
          imagem_embarcacao: true,
        },
      },
      relacao_embarcacao_proprietario: {
        include: {
          pessoa: true,
          pais: true,
        },
      },
      viagem: {
        include: {
          porto_origem: {
            include: {
              pais: true,
            },
          },
          porto_destino: {
            include: {
              pais: true,
            },
          },
        },
      },
    },
  });
  return res;
}

export default async function VesselPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const embarcacao = (await getData(params.id)) as unknown as Embarcacao;

  return (
    <div className='p-1 md:p-4 mt-10 lg:mx-24 bg-white rounded-xl flex flex-col gap-2 shadow-sm '>
      <div className='flex flex-wrap gap-4'>
        <div className='flex flex-col gap-1 rounded-xl border min-w-[50%]'>
          <div className='p-2 text-sm bg-blue-200 dark:bg-slate-900 rounded-ss-xl rounded-se-xl'>
            Nome
          </div>
          <div className='p-2 text-xs'>{embarcacao?.nome}</div>
        </div>
        <div className='flex flex-col border gap-1 rounded-xl grow'>
          <div className='p-2 text-sm bg-blue-200 dark:bg-slate-900 rounded-ss-xl rounded-se-xl'>
            Tipo
          </div>
          <div className='p-2 text-xs'>{embarcacao?.tipo_embarcacao?.tipo}</div>
        </div>
        <div className='flex flex-col border gap-1 rounded-xl grow'>
          <div className='p-2 text-sm bg-blue-200 dark:bg-slate-900 rounded-ss-xl rounded-se-xl'>
            Descrição
          </div>
          <div className='p-2 text-xs'>
            {embarcacao?.tipo_embarcacao?.texto_descritivo}
          </div>
        </div>
        {embarcacao?.tipo_embarcacao?.imagem_embarcacao &&
          embarcacao?.tipo_embarcacao?.imagem_embarcacao.length > 0 && (
            <div className='flex flex-col p-2 gap-2'>
              <div className='flex flex-wrap gap-2'>
                {embarcacao?.tipo_embarcacao?.imagem_embarcacao?.map((img) => (
                  <img
                    key={img.id}
                    src={img.imagem}
                    alt={embarcacao?.tipo_embarcacao?.tipo}
                    className='w-full border rounded-lg  max-h-64 md:max-w-96 md:w-auto'
                  />
                ))}
              </div>
            </div>
          )}
        <div className='flex flex-col w-full border gap-1 rounded-xl'>
          <div className='p-2 text-sm bg-blue-200 dark:bg-slate-900 rounded-ss-xl rounded-se-xl'>
            Observação
          </div>
          <div className='p-2 text-xs'>{embarcacao?.observacao}</div>
        </div>
        <Accordion type='multiple' className='flex flex-col flex-1 w-full'>
          <AccordionItem value='vessel' className='w-full'>
            <AccordionTrigger>Pessoas</AccordionTrigger>
            <AccordionContent>
              <PessoasTable embarcacao={embarcacao as Embarcacao} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='trip' className='w-full'>
            <AccordionTrigger>Viagens</AccordionTrigger>
            <AccordionContent>
              <ViagensTable embarcacao={embarcacao} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
