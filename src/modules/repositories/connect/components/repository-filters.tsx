import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface Props {
  value: string;
  onSearch: (value: string) => void;
}

export const RepositoryFilters = ({ value, onSearch }: Props) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search repositories..."
        value={value}
        onChange={(event) => onSearch(event.target.value)}
        className="pl-9"
      />
    </div>
  );
}
