import { validateRequest } from '@/auth';
import TripsTable from './_components/tables/table';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin | Viagens',
  description: 'Gestão de Viagens',
};

export default async function EmbarcacoesPage() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect('/auth/signin');
  }
  return (
    <main className='flex flex-col p-4 mt-5 border-2 border-gray-300 dark:border-slate-950 border-solid shadow-lg  gap-2 rounded-3xl lg:mx-24'>
      <TripsTable />
    </main>
  );
}
