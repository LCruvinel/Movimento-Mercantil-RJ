import { validateRequest } from '@/auth';
import { redirect } from 'next/navigation';
import ChangePassword from './_components/changepassword';

export default async function UsersPage() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect('/auth/signin');
  }

  return (
    <main className='flex flex-col p-4 mt-5 border-2 border-gray-300 border-solid shadow-lg  gap-2 rounded-3xl md:mx-24'>
      <ChangePassword />
    </main>
  );
}
