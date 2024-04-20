import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import fetcher from '@/lib/fetch';
import { Dispatch, SetStateAction, useState } from 'react';
import useSWR from 'swr';
import AddOwner from './addownerbutton';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Loader from '@/components/loader';
import { X } from 'lucide-react';

export default function VesselDetails(props: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  embarcacao_id: number | undefined;
}) {
  const { open, setOpen, embarcacao_id } = props;
  const [deleting, setDeleting] = useState(false);

  const {
    data: embarcacao,
    isLoading,
    mutate: mutateEmbarcacao,
  } = useSWR<Embarcacao>(
    embarcacao_id ? `/api/embarcacao/read/byid?id=${embarcacao_id}` : null,
    fetcher
  );

  async function handleDeleteOwner(id: number) {
    setDeleting(true);
    await fetcher(`/api/embarcacao/delete/owner`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    mutateEmbarcacao();
    setDeleting(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className=' min-w-[50%] w-11/12 p-6 rounded-lg max-h-[95%] overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle className={isLoading ? 'h-64' : ''}>
            {isLoading ? <Loader /> : 'Embarcação #' + embarcacao_id}
          </DialogTitle>
          <DialogDescription asChild></DialogDescription>
        </DialogHeader>
        {!isLoading && (
          <>
            <div className='flex flex-wrap gap-2'>
              <div className='flex flex-col gap-1 rounded-xl border min-w-[50%]'>
                <div className='bg-blue-200 p-2 rounded-ss-xl rounded-se-xl text-sm'>
                  Nome
                </div>
                <div className='p-2 text-xs'>{embarcacao?.nome}</div>
              </div>
              <div className='flex flex-col gap-1 rounded-xl border grow'>
                <div className='bg-blue-200 p-2 rounded-ss-xl rounded-se-xl text-sm'>
                  Tipo
                </div>
                <div className='p-2 text-xs'>
                  {embarcacao?.tipo_embarcacao.tipo}
                </div>
              </div>
              <div className='flex flex-col gap-1 rounded-xl border grow'>
                <div className='bg-blue-200 p-2 rounded-ss-xl rounded-se-xl text-sm'>
                  Descrição
                </div>
                <div className='p-2 text-xs'>
                  {embarcacao?.tipo_embarcacao.texto_descritivo}
                </div>
              </div>
              <div className='flex flex-col gap-1 rounded-xl border w-full'>
                <div className='bg-blue-200 p-2 rounded-ss-xl rounded-se-xl text-sm'>
                  Observação
                </div>
                <div className='p-2 text-xs'>{embarcacao?.observacao}</div>
              </div>
              <div className=' max-w-xs md:max-w-full flex-1 rounded-ss-xl rounded-se-xl'>
                <Table>
                  <TableHeader className='bg-blue-200 p-2  text-xs '>
                    <TableRow className='rounded-ss-xl'>
                      <TableHead>Pessoa</TableHead>
                      <TableHead>Início</TableHead>
                      <TableHead>Fim</TableHead>
                      <TableHead>País</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {embarcacao?.relacao_embarcacao_proprietario.map(
                      (relacao) => (
                        <TableRow key={relacao.id}>
                          <TableCell className='font-medium text-xs'>
                            {relacao.pessoa.nome} | {relacao.pessoa?.pais?.pais}
                          </TableCell>
                          <TableCell className='text-xs'>
                            {dayjs(relacao.data_inicio).format('DD/MM/YYYY')}
                          </TableCell>
                          <TableCell className='text-xs'>
                            {dayjs(relacao.data_fim).format('DD/MM/YYYY')}
                          </TableCell>

                          <TableCell className='text-xs'>
                            {relacao.pais.pais}
                          </TableCell>
                          <TableCell>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  size='icon'
                                  variant='link'
                                  className='text-xs text-blue-500'
                                >
                                  <X className='w-4 text-red-700' />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Tem a certeza?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta ação não pode ser desfeita. Esta ação
                                    irá remover o proprietário da embarcação.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    disabled={deleting}
                                    onClick={() =>
                                      handleDeleteOwner(relacao.id)
                                    }
                                  >
                                    {deleting ? 'Aguarde...' : 'Remover'}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                  {embarcacao?.relacao_embarcacao_proprietario.length === 0 && (
                    <TableCaption>Nenhum proprietário encontrado</TableCaption>
                  )}
                </Table>
              </div>
            </div>
            <AddOwner mutate={mutateEmbarcacao} embarcacaoId={embarcacao_id} />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
