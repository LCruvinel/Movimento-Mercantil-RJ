import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";

interface SearchProps {
  searchInput: string;
  setSearchInput: (input: string) => void;
  onSearch: () => void;
  children?: React.ReactNode;
}

export default function Search({
  searchInput,
  setSearchInput,
  onSearch,
  children,
}: SearchProps) {
  return (
    <div className="flex items-center justify-left p-2 pb-3 sm:w-1/2 md:w-1/3">
      <Input
        type="search"
        placeholder="Pesquisa . . ."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <div>
        <Button
          className="text-white shadow-2xl transition-all duration-300 bg-blue-500 rounded-m hover:scale-105 hover:bg-blue-200 active:scale-95 ml-2"
          onClick={onSearch}
        >
          <SearchIcon />
        </Button>
      </div>
      {children}
    </div>
  );
}
