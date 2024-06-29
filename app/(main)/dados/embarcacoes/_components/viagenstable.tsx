'use client';

import Paginacao from '@/components/sharedpagination';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import chunk from '@/lib/chunk';
import dayjs from 'dayjs';
import { useState } from 'react';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(tz);

interface ViagensTableProps {
  embarcacao: Embarcacao;
}

export const PessoasTable: React.FC<ViagensTableProps> = ({ embarcacao }) => {
  const [activePageViagens, setActivePageViagens] = useState(1);
  const chunkedviagens = chunk(embarcacao?.viagem ?? [], 5);
  const viagens = chunkedviagens[activePageViagens - 1];
  return (
    <>
      <Table>
        <TableHeader className='p-2 text-xs bg-blue-200 dark:bg-slate-900 '>
          <TableRow className='rounded-ss-xl'>
            <TableHead>Data rio</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Origem</TableHead>
            <TableHead>Destino</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {viagens?.map((viagem) => (
            <TableRow key={viagem.id}>
              <TableCell className='text-xs'>
                {viagem.data_rio
                  ? dayjs.tz(viagem.data_rio, 'UTC').format('DD/MM/YYYY')
                  : 'N/A'}
              </TableCell>
              <TableCell className='text-xs'>{viagem.entrada_sahida}</TableCell>
              <TableCell className='text-xs'>
                {viagem.porto_origem?.nome ? viagem.porto_origem?.nome : 'N/A'}
                {viagem.porto_origem?.pais?.pais
                  ? ' | ' + viagem.porto_origem?.pais?.pais
                  : ''}
              </TableCell>
              <TableCell className='text-xs'>
                {viagem.porto_destino?.nome
                  ? viagem.porto_destino?.nome
                  : 'N/A'}
                {viagem.porto_destino?.pais?.pais
                  ? ' | ' + viagem.porto_destino?.pais?.pais
                  : ''}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {embarcacao?.viagem.length === 0 && (
          <TableCaption>
            Nenhuma viagem encontrada para esta embarcação
          </TableCaption>
        )}
      </Table>

      <Paginacao
        chunked={chunkedviagens}
        activePage={activePageViagens}
        setPage={setActivePageViagens}
      />
    </>
  );
};

export default PessoasTable;
