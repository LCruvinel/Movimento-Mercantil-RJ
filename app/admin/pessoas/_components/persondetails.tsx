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
import PersonRelacaoEmbarcacaoTable from './personrelacembarcacaotable';
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
} from '@/components/ui/alert-dialog'; // import AddOwner from './addownerbutton';
import { toast } from 'sonner';
import Loader from '@/components/loader';
import { TrashIcon } from 'lucide-react';

export default function PersonDetails(props: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  pessoa_id: number | undefined;
  mutate: () => void;
}) {
  const { open, setOpen, pessoa_id, mutate } = props;
  const [deleting, setDeleting] = useState(false);
  const {
    data: pessoa,
    isLoading,
    mutate: mutatePessoa,
  } = useSWR<Pessoa>(
    pessoa_id ? `/api/pessoa/read/byid?id=${pessoa_id}` : null,
    fetcher
  );

  async function handleDeletePerson(id: number) {
    setDeleting(true);
    const result = await fetch(`/api/pessoa/delete`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    if (result.ok) {
      mutate();
      toast.success('Pessoa removida com sucesso');
      setOpen(false);
    } else {
      toast.error('Erro ao remover pessoa');
    }
    setDeleting(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='min-w-[50%] max-w-[95%] md:max-w-[50%] p-6 rounded-lg max-h-[95%] overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle>Pessoa</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <Loader classProp='h-24 w-24 self-center' />
        ) : (
          <>
            <div className='flex flex-wrap gap-2'>
              <div className='flex flex-col gap-1 rounded-xl border min-w-[50%]'>
                <div className='bg-blue-200 p-2 rounded-ss-xl rounded-se-xl text-sm'>
                  Nome
                </div>
                <div className='p-2 text-xs'>{pessoa?.nome}</div>
              </div>

              <div className='flex flex-col gap-1 rounded-xl border grow'>
                <div className='bg-blue-200 p-2 rounded-ss-xl rounded-se-xl text-sm'>
                  Título Nobreza
                </div>
                <div className='p-2 text-xs'>
                  {pessoa?.titulo_nobreza?.titulo}
                </div>
              </div>
            </div>

            <div className=' flex flex-col items mt-4 '>
              <div className='flex gap-1 p-2 bg-blue-200 justify-center mx-auto w-[50%] rounded-ss-xl rounded-se-xl text-sm'>
                Embarcações
              </div>
              <PersonRelacaoEmbarcacaoTable
                pessoa={pessoa}
                mutatePessoa={mutatePessoa}
              />
            </div>

            <AlertDialog>
              <AlertDialogTrigger className='w-full' asChild>
                <Button variant='destructive' className=' w-full'>
                  Remover <TrashIcon className='ml-2 w-5 h-5' />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Tem a certeza?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta ação não pode ser desfeita. Esta ação irá remover a
                    pessoa!
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className='bg-red-500 hover:bg-red-600'
                    disabled={deleting}
                    onClick={() => {
                      if (pessoa?.id) handleDeletePerson(pessoa?.id);
                    }}
                  >
                    {deleting ? 'Aguarde...' : 'Remover'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            {/* <AddOwner mutate={mutateEmbarcacao} embarcacaoId={embarcacao_id} /> */}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
