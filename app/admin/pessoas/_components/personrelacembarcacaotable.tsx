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

import { useState } from 'react';
import fetcher from '@/lib/fetch';
import { XIcon } from 'lucide-react';

export default function PersonRelacaoEmbarcacaoTable(props: {
  pessoa: Pessoa | undefined;
  mutatePessoa: () => void;
}) {
  const { pessoa, mutatePessoa } = props;
  const [deleting, setDeleting] = useState(false);

  async function handleDeleteOwner(id: number) {
    setDeleting(true);
    await fetcher(`/api/embarcacao/delete/owner`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    mutatePessoa();
    setDeleting(false);
  }

  return (
    <div className='flex-1 max-w-xs  md:max-w-full rounded-ss-xl rounded-se-xl'>
      <Table className='shadow-xl'>
        <TableHeader className='p-2 text-xs bg-blue-200 border-t-0 '>
          <TableRow className='rounded-ss-xl'>
            <TableHead>ID</TableHead>
            <TableHead>Embarcação</TableHead>
            <TableHead>Início</TableHead>
            <TableHead>Fim</TableHead>
            <TableHead>País</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pessoa?.relacao_embarcacao_proprietario?.map((relacao) => (
            <TableRow key={relacao.id}>
              <TableCell className='px-4 py-0 text-xs font-medium'>
                {relacao.embarcacao.id}
              </TableCell>
              <TableCell className='px-4 py-0 text-xs'>
                {relacao.embarcacao.nome}
              </TableCell>
              <TableCell className='px-4 py-0 text-xs'>
                {dayjs(relacao.data_inicio).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell className='px-4 py-0 text-xs'>
                {dayjs(relacao.data_fim).format('DD/MM/YYYY')}
              </TableCell>

              <TableCell className='px-4 py-0 text-xs'>
                {relacao.pais.pais}
              </TableCell>
              <TableCell className='px-4 py-0 text-xs'>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size='icon'
                      variant='link'
                      className='text-xs text-blue-500'
                      onClick={() => {
                        console.log('edit');
                      }}
                    >
                      <XIcon className='w-4 text-red-700' />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Tem a certeza?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Esta ação irá remover o
                        proprietário da embarcação.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className='bg-red-500 hover:bg-red-600'
                        disabled={deleting}
                        onClick={() => handleDeleteOwner(relacao.id)}
                      >
                        {deleting ? 'Aguarde...' : 'Remover'}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {pessoa?.relacao_embarcacao_proprietario?.length === 0 && (
          <TableCaption className='p-4'>
            Nenhum proprietário encontrado
          </TableCaption>
        )}
      </Table>
    </div>
  );
}
