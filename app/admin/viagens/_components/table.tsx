'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import fetcher from '@/lib/fetch';
import dayjs from 'dayjs';
import useSWR from 'swr';
import TripDetails from './tripdetails';
import { useState } from 'react';
export default function TripsTable() {
  const [open, setOpen] = useState(false);
  const [viagem_id, setViagemId] = useState<number | undefined>();
  const {
    data: viagens,
    isLoading,
    mutate,
  } = useSWR<Viagem[]>('/api/viagem/read', fetcher);

  return (
    <>
      <Table>
        <TableHeader className='bg-blue-200 p-2 text-xs border-t-0 '>
          <TableRow className='rounded-ss-xl'>
            <TableHead>ID</TableHead>
            <TableHead>Data de Partida</TableHead>
            <TableHead>Data de Chegada</TableHead>
            <TableHead>Dias de Viagem</TableHead>
            <TableHead>Tripulação</TableHead>
            <TableHead>Passageiros</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {viagens?.map((viagem) => (
            <TableRow
              className='cursor-pointer hover:bg-blue-100'
              key={viagem.id}
              onClick={(e) => {
                e.stopPropagation();
                setViagemId(viagem.id);
                setOpen(true);
              }}
            >
              <TableCell className='font-medium text-xs'>{viagem.id}</TableCell>
              <TableCell className='font-medium text-xs'>
                {dayjs(viagem.data_viagem).format('DD-MM-YYYY')}
              </TableCell>
              <TableCell className='font-medium text-xs'>
                {dayjs(viagem.data_chegada).format('DD-MM-YYYY')}
              </TableCell>
              <TableCell className='font-medium text-xs'>
                {viagem.dias_viagem}
              </TableCell>
              <TableCell className='font-medium text-xs'>
                {viagem.tripulacao}
              </TableCell>
              <TableCell className='font-medium text-xs'>
                {viagem.total_passageiros}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TripDetails
        open={open}
        setOpen={setOpen}
        viagem_id={viagem_id}
        mutate={mutate}
      />
    </>
  );
}
