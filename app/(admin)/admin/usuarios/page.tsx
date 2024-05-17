import { validateRequest } from '@/auth';
import TabelaUsuarios from './_components/table';
import { redirect } from 'next/navigation';

export default async function UsersPage() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect('/auth/signin');
  }

  if (user.role != 'ADMIN') {
    return redirect('/admin/dashboard');
  }

  return (
    <main className='flex flex-col p-4 mt-5 border-2 border-gray-300 border-solid shadow-lg  gap-2 rounded-3xl md:mx-24'>
      <TabelaUsuarios />
    </main>
  );
}
