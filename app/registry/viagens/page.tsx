import TripsTable from "./_components/table";
import Search from "./_components/search";

export default function ViagensTable() {
  return (
    <main className="min-h-full flex flex-col">
      <div className="min-h-full p-4 border-2 shadow-lg mt-24 gap-2 rounded-3xl md:mx-24">
        <div className="w-full min-h-full dark:bg-black md:h-screen md:mt-0">
          <Search />
          <TripsTable />
        </div>
      </div>
    </main>
  );
}
